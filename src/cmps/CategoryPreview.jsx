import { useNavigate } from "react-router"

export function CategoryPreview({ category }) {

    const navigate = useNavigate()
    function onCategory() {
        navigate(`/genre/${category.id}`)
    }


    return (
        <div className="category-preview" style={{ backgroundColor: category.color }} onClick={onCategory}>
                <div className='name'> {category.name} </div>
                <img src={category.imgUrl} />
        </div>
    )


}