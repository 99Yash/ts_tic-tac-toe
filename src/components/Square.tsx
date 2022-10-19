export type Player = 'X' | 'O' | null;

function Square(props: {
  value: Player;
  winner: Player | 'draw';
  onClick: () => void;
}) {
  if (!props.value) {
    return (
      <button
        className="w-24 h-24 text-lg border-gray-500"
        onClick={props.onClick}
        disabled={Boolean(props.winner)}
      />
    );
  }
  return (
    <button
      disabled
      className="w-24 h-24 text-lg border border-gray-400 "
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;
