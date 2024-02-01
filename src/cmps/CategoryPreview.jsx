
export function CategoryPreview({ category }) {

    return (
        <div className="category-preview" style={{ backgroundColor: category.color }} >
                <div className='name'> {category.name} </div>
                <img src={category.imgUrl} />
        </div>
    )


}