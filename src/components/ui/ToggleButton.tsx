function ToggleButton({
  icon,
  clickHandler,
}: {
  icon: string;
  clickHandler: () => void;
}) {
  return (
    <div
      className="border-4 rounded-md py-1 px-2 border-gray-300 dark:border-gray-500 hover:invert-25 duration-200 select-none cursor-pointer text-3xl"
      onClick={clickHandler}
    >
      {icon}
    </div>
  );
}

export default ToggleButton;
