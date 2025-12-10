export default function Button(props) {
  let background;
 let color;
 let rounded = 'rounded-lg'; ;
  switch (props.type) {
    case 'primary':;
  background = 'bg-gray-300';
      break;
    case 'modifier':
      background = 'bg-yellow-300';
      break;
    case 'supprimer':
      background = 'bg-red-500';
      color = 'text-white';
      break;  
    case 'enregister':
      background = 'bg-blue-500';
      color = 'text-white';
      rounded = 'rounded-[0.5vw]';
      break;
      
    default:
        color = 'text-black';   
        rounded = 'rounded-lg';
      break;
  }
     return (
    <button
        className={`p-2 px-5 ${rounded} shadow-md todo-item ${background} ${color}`}
        onClick={props.onClick ? props.onClick : undefined}
    >
      {props.children}
    </button>     
 );
}
