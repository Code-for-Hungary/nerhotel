import { FaShoppingBasket, FaSpa, FaWineBottle } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { MdCasino, MdLocalBar, MdLocalCafe, MdOutlineRestaurant, MdSelectAll } from "react-icons/md";
import { TbHotelService } from "react-icons/tb";
import styles from "./FilterControl.module.css";
import { controlButton } from "../css/map-list-opener.module.css";
import { FaFilter } from "react-icons/fa6";
import { useState, useCallback } from "react";

function FilterControl({ language, filterType, setFilterType }) {
    const [filterOpen, setFilterOpen] = useState(false);
    const size = 16;
    const options = [
        { type: "mind", category: "all", category_de: "Alles", icon: <MdSelectAll size={size} /> },
        { type: "bár", category: "bar", category_de: "Bar", icon: <MdLocalBar size={size} /> },
        { type: "borászat", category: "winery", category_de: "Weingut", icon: <FaWineBottle size={size} /> },
        { type: "étterem", category: "restaurant", category_de: "Restaurant", icon: <MdOutlineRestaurant size={size} /> },
        { type: "kávézó", category: "café", category_de: "Cafe", icon: <MdLocalCafe size={size} /> },
        { type: "spa&sport", category: "spa&sport", category_de: "Spa und Sport", icon: <FaSpa size={size} /> },
        { type: "kaszinó", category: "casino", category_de: "Kasino", icon: <MdCasino size={size} /> },
        { type: "kemping", category: "camping", category_de: "Camping", icon: <GiCampingTent size={size} /> },
        { type: "kiskereskedelem", category: "retail", category_de: "Einzelhandel", icon: <FaShoppingBasket size={size} /> },
        { type: "szálloda", category: "hotel", category_de: "Hotel", icon: <TbHotelService size={size} /> },
    ];
    const toggleFilterOpen = useCallback(() => {
        setFilterOpen((prevState) => !prevState);
    }, []);

    function getTranslation(language, option) {
        switch (language) {
            case "hu":
                return option.type;
            case "en":
                return option.category;
            case "de":
                return option.category_de;
            default:
                return option.type;
        }
    }

    return (
        <>
            <button className={`${controlButton} ${styles.filterOpenButton}`} onClick={toggleFilterOpen}>
                <FaFilter />
                <div className={`${styles.cornerIcon} ${filterType !== "mind" && styles.showCornerIcon}`}></div>
            </button>
            <div className={` ${styles.filterPanelWrapper} ${filterOpen && styles.filterOpen}`} key={filterOpen ? "open" : "closed"}>
                <div className={`${styles.filterPanel}`}>
                    {options.map((option, i) => (
                        <div
                            className={`${filterType === option.type && styles.selectedRow} 
                                ${styles.filterRow}
                                ${i !== options.length - 1 && styles.filterRowSeparator}`}
                            onClick={() => {
                                setFilterType(option.type);
                                setFilterOpen(false);
                            }}
                        >
                            <button className={`${styles.filterButton}`}>{option.icon}</button>
                            <span>{getTranslation(language, option)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default FilterControl;
