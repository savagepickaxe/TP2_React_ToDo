export default function Button(props) {
  return (
    <button
        type={props.type ? props.type : "button"}
        className={`todo-item__button ${props.className ? props.className : ""}`}
        id={props.id ? props.id : undefined}
        onClick={props.onClick ? props.onClick : undefined}
    >
      {props.children}
    </button>
  );
}
