import { Link } from 'react-router-dom'
import styles from'../category.module.css'


function CategoryCards({data}) {

 
  return (
    <div className={styles.Card}>
      <Link to={`/category/${data.name}`}>
       <span><h2>{data.category}</h2></span>

     <img src={
        data.image
     } alt="" />

     <p>{data.title}</p>


      </Link>
    </div>
  )
}

export default CategoryCards
