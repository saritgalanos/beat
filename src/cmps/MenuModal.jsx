
export function MenuModal({ menuItems, position }) {
    const modalStyle = {
        position: 'absolute',
        ...position
      };
    

    return (
        <div className="menu-modal" style={modalStyle}>
          {menuItems.map((item, index) => (
            <div className={`menu-item  ${item.itemClass} fs13`} key={index} onClick={() => item.action(item.param)}>
              {item.text}
            </div>
          ))}
        </div>
      )

   
}