const EmptyChatIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="96"
      height="96"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={`${className}`}
    >
      <path
        d="M17 2H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6l4 4V4a2 2 0 0 0-2-2z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EmptyChatIcon;
