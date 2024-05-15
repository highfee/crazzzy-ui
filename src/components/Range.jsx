const Range = ({ length }) => {
  return (
    <div className="pt-[6px] relative bg-white mb-2 rounded-xl overflow-hidden">
      <div
        className={`absolute h-full bg-[#7c9938]  left-0 top-0 rounded`}
        style={{ width: length + "%" }}
      ></div>
    </div>
  );
};

export default Range;
