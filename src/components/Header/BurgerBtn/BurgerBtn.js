import './BurgerBtn.css'

const BurgerBtn = ({
  isNavBarVisible,
  handlOpenNav,
}) => {



  return (
    <button
      className={`header__burger-btn ${
        isNavBarVisible ? "header__burger-btn_open" : ""
      }`}
      onClick={handlOpenNav}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  )

}

export default BurgerBtn;
