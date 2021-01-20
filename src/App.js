import { useState, state } from 'react';
import './index.css';
import {table, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
function App() {
 
  const [food, setFood] = useState([  {itemName: "Milk", quantity: 1, isSelected: false},
                                      { itemName: 'item 2', quantity: 3, isSelected: true },
	                                  	{ itemName: 'item 3', quantity: 2, isSelected: false },
    
  ]);
  const [totalItemCount, setTotalItemCount] = useState(6);
  
// <label>{item.ItemsName} </label>
const [inputValue, setInputValue] = useState('');

  function Liste(props){
    return(
      <>
      {props.data.map((item, index) =>{
        return(
          
           
            
            <form key={item.id} onSubmit={handleSubmit}>
              <div className='item-name' onClick={()=> toggleComplete(index)}>
                <p>{index + 1}</p>
								{item.isSelected ? (
									<>
										<FontAwesomeIcon icon={faCheckCircle} />
										<span className='completed'>{item.itemName}</span>
									</>
								) : (
									<>
										<FontAwesomeIcon icon={faCircle} />
										<span>{item.itemName}</span>
									</>
								)}
							</div>
                 
              <button>
								<FontAwesomeIcon icon={faChevronLeft} onClick={()=>(handleDecrease(index))} />
							</button>
							<span> {item.quantity} </span>
							<button>
              {/* passing the index will show which button was clicked*/}
								<FontAwesomeIcon icon={faChevronRight} onClick={()=>(handleIncrease(index))}/>
							</button>
              

            </form>
          
        )
       
        })}
       
    </>
    );

  }

  const calculateTotal = () =>{
      const totalItemCount = food.reduce((total, item)=>{
        return total + item.quantity;
      }, 0);
      setTotalItemCount(totalItemCount);
  };


  const toggleComplete = (index) =>{

    const newSelect = [...food];
                                  //Changes Bool
    newSelect[index].isSelected = !newSelect[index].isSelected;

    setFood(newSelect);

  };


  const handleIncrease = (index) =>{
      
      const newItems = [...food];
      newItems[index].quantity++;

      setFood(newItems);
      calculateTotal();
      
  }

  const handleDecrease = (index) =>{
      
    const newItems = [...food];
    newItems[index].quantity--;

    setFood(newItems);
    calculateTotal();
    
}


  function handleSubmit(event) {
    event.preventDefault();
  }

  const handleAddButtonClick = () =>{
    calculateTotal();
      const newItem = {
        itemName: inputValue,
        quantity: 1,
        isSelected: false
      }

      const newFood = [...food, newItem];
      
      setFood(newFood);
       setInputValue('');
      console.log(inputValue);

    
  }
 



function DeleteAll(props){
  food.length = 0;
 
  setFood([...food])
}

  
return (
  <Container>
    <Row>
    <div className="add-item-box">   
    <Col>
    
    <input type="text" value={inputValue} 
    onChange={(event)=>setInputValue(event.target.value)} 
    className="form-control" id="newItemInput" placeholder="Add an Item..."/></Col>
    <Col> <button type="submit" className="btn btn-primary" onClick={()=>(handleAddButtonClick())}>ADD</button></Col>
    </div>
    </Row>
    

  <Container className="table table-hover table-dark"  onSubmit={handleSubmit} style={{minHeight: "40vh"}}>
     
             
            <Liste data = {food}/>
             <Row><Col></Col></Row>
             <Row className="Footer"><Col><h3 >Items: {totalItemCount}</h3></Col>
             <Col className=" justify-content-end"> <button type="submit" className="btn btn-primary" onClick={()=>DeleteAll()} style={{float: 'right'}} >Clear</button></Col></Row>
              
    

      </Container>

      </Container>
);}


export default App;
