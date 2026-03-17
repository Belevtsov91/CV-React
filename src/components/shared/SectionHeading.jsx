export default function SectionHeading({ title, titleClassName }) {
  return (
    <div className="cont-exp" data-reveal>
      <div className="cont-svg">
        <svg
          className="container-main-svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.00008 7.08335C3.84949 7.08335 2.91675 6.15061 2.91675 5.00002C2.91675 3.84943 3.84949 2.91669 5.00008 2.91669C6.15067 2.91669 7.08341 3.84943 7.08341 5.00002C7.08341 6.15061 6.15067 7.08335 5.00008 7.08335Z"
            fill="#C696FC"
          />
        </svg>
      </div>
      <h2 className={titleClassName}>{title}</h2>
    </div>
  );
}
