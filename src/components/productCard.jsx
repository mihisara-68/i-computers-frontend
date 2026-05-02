export default function ProductCard(props){
    console.log(props.name)

    return(
        
         <div className="bg-red-400 border border-green-600 w-44 text-white ">
              <h1 className="text-blue-300 text-3xl">{props.name}</h1>
              <img src={props.image} alt={" picture of a "+props.name} />
              <p>LKR {props.price}/-</p>
              <button>buy now</button>
            </div>
    )
}
