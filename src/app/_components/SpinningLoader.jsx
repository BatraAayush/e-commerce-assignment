const SpinningLoader = ({large}) => {
  return (
    <div className={`loader border-4 border-t-4 border-t-white border-gray-300 rounded-full ${large?'w-10 h-10': 'w-5 h-5'} animate-spin`}></div>
  );
};

export default SpinningLoader;
