import { FaShoppingBasket, FaSpa, FaWineBottle } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { MdCasino, MdLocalBar, MdLocalCafe, MdOutlineRestaurant, MdSelectAll } from "react-icons/md";
import { TbHotelService } from "react-icons/tb";
import styles from "../css/map-list-opener.module.css";

function FilterControl({ filterType, setFilterType }) {
    const size = 16;
    const options = [
        { type: "mind", category: "all", name: "Alles", icon: <MdSelectAll size={size} /> },
        { type: "bár", category: "bar", name: "Bar", icon: <MdLocalBar size={size} /> },
        { type: "borászat", category: "winery", name: "Weingut", icon: <FaWineBottle size={size} /> },
        { type: "étterem", category: "restaurant", name: "Restaurant", icon: <MdOutlineRestaurant size={size} /> },
        { type: "kávézó", category: "café", name: "Cafe", icon: <MdLocalCafe size={size} /> },
        { type: "spa&sport", category: "spa&sport", name: "Spa und Sport", icon: <FaSpa size={size} /> },
        { type: "kaszinó", category: "casino", name: "Kasino", icon: <MdCasino size={size} /> },
        { type: "kemping", category: "camping", name: "Camping", icon: <GiCampingTent size={size} /> },
        { type: "kiskereskedelem", category: "retail", name: "Einzelhandel", icon: <FaShoppingBasket size={size} /> },
        { type: "szálloda", category: "hotel", name: "Hotel", icon: <TbHotelService size={size} /> },
    ];

    return (
        <div className={`${styles.filterRowWrapper}`}>
            <div className={`${styles.filterRow}`}>
                {options.map((option) => (
                    <button
                        className={`${filterType == option.type ? styles.selectedButton : ""} ${styles.filterButton}`}
                        title={option.type}
                        onClick={() => setFilterType(option.type)}
                    >
                        {option.icon}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterControl;
