import styles from'./category.module.css'
import CategoryCards from "./CategoryCaards/CategoryCards";
import catagoryFullData from "./CategoryCaards/catagoryFullData";

function Category() {
  return (
    <div className={styles.Catagory_conateiner }>
      {catagoryFullData?.map((images, i) => {
        return <CategoryCards key={i} data={images} />;
      })}
    </div>
  );
}

export default Category;
