import styles from'../category.module.css'


function CategoryCards({data}) {

    
  return (
    <div className={styles.Card}>
      <a href="">
       <span><h2>{data.category}</h2></span>

     <img src={
        data.image
     } alt="" />

     <p>{data.title}</p>


      </a>
    </div>
  )
}

export default CategoryCards
