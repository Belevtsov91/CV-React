import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";

// Mock sonner before importing the hook
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

import { toast } from "sonner";
import { useContactForm, SUBJECT_OPTIONS } from "../../hooks/useContactForm";

const VALID_FIELDS = {
  name: "John Doe",
  email: "john@example.com",
  subject: "Job Opportunity",
  message: "Hello there",
};

function renderForm(overrides = {}) {
  const onClose = vi.fn();
  const messageTransform = vi.fn((f) => f.message);
  const successToast = "Sent!";
  const result = renderHook(() =>
    useContactForm({ onClose, messageTransform, successToast, ...overrides })
  );
  return { ...result, onClose, messageTransform };
}

function fillFields(result, fields = VALID_FIELDS) {
  for (const [name, value] of Object.entries(fields)) {
    act(() => {
      result.current.handleChange({ target: { name, value } });
    });
  }
}

describe("SUBJECT_OPTIONS", () => {
  it("first option has empty value", () => {
    expect(SUBJECT_OPTIONS[0].value).toBe("");
  });
  it("has at least 3 real options", () => {
    expect(SUBJECT_OPTIONS.filter((o) => o.value !== "").length).toBeGreaterThanOrEqual(3);
  });
});

describe("useContactForm — initial state", () => {
  it("fields start empty", () => {
    const { result } = renderForm();
    expect(result.current.fields).toEqual({
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    });
  });

  it("errors and valid start empty", () => {
    const { result } = renderForm();
    expect(result.current.errors).toEqual({});
    expect(result.current.valid).toEqual({});
  });
});

describe("handleChange", () => {
  it("updates the changed field", () => {
    const { result } = renderForm();
    act(() => {
      result.current.handleChange({ target: { name: "name", value: "Alice" } });
    });
    expect(result.current.fields.name).toBe("Alice");
  });

  it("clears error for the changed field", () => {
    const { result } = renderForm();
    // Trigger validation to set errors first
    act(() => {
      result.current.runValidation();
    });
    expect(result.current.errors.name).toBeTruthy();

    act(() => {
      result.current.handleChange({ target: { name: "name", value: "Alice" } });
    });
    expect(result.current.errors.name).toBeFalsy();
  });
});

describe("runValidation", () => {
  it("returns false and shows toast when fields empty", () => {
    const { result } = renderForm();
    let valid;
    act(() => {
      valid = result.current.runValidation();
    });
    expect(valid).toBe(false);
    expect(toast.error).toHaveBeenCalled();
  });

  it("returns false for invalid email", () => {
    const { result } = renderForm();
    fillFields(result, { ...VALID_FIELDS, email: "not-an-email" });
    let valid;
    act(() => {
      valid = result.current.runValidation();
    });
    expect(valid).toBe(false);
    expect(result.current.errors.email).toBeTruthy();
  });

  it("returns true when all fields valid", () => {
    const { result } = renderForm();
    fillFields(result);
    let valid;
    act(() => {
      valid = result.current.runValidation();
    });
    expect(valid).toBe(true);
  });
});

describe("handleClose", () => {
  it("resets fields and calls onClose", () => {
    const { result, onClose } = renderForm();
    fillFields(result);
    act(() => {
      result.current.handleClose();
    });
    expect(result.current.fields).toEqual({
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("handleSubmit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    // Force DEV mode so cooldown is bypassed
    vi.stubEnv("DEV", true);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("does not fetch when validation fails", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderForm();
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(fetchMock).not.toHaveBeenCalled();

    vi.unstubAllGlobals();
  });

  it("calls fetch with correct payload on valid submit", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);

    const { result, onClose } = renderForm();
    fillFields(result);

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toMatch(/\/api\/messages$/);
    const body = JSON.parse(options.body);
    expect(body.name).toBe("John Doe");
    expect(body.email).toBe("john@example.com");
    expect(body.subject).toBe("Job Opportunity");
    expect(body.website).toBe("");
    expect(toast.success).toHaveBeenCalledWith("Sent!");
    expect(onClose).toHaveBeenCalled();

    vi.unstubAllGlobals();
  });

  it("shows 429 error toast on rate-limit response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 429 });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderForm();
    fillFields(result);

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/too many/i));

    vi.unstubAllGlobals();
  });

  it("shows network error toast when fetch throws", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network fail"));
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderForm();
    fillFields(result);

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(toast.error).toHaveBeenCalledWith(
      expect.stringMatching(/connection/i),
      expect.any(Object),
    );

    vi.unstubAllGlobals();
  });
});
