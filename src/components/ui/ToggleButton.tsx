function ToggleButton({
  icon,
  clickHandler,
  isActive = false,
}: {
  icon: string;
  clickHandler: () => void;
  isActive?: boolean;
}) {
  return (
    <div
      className={`border-4 rounded-md py-1 px-2 border-gray-300  hover:invert-25 duration-200 select-none cursor-pointer text-3xl ${
        isActive ? "dark:border-primary" : "dark:border-gray-500"
      }`}
      onClick={clickHandler}
    >
      {icon}
    </div>
  );
}

export default ToggleButton;
