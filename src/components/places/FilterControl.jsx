import { useTranslation } from "react-i18next";
import { useState, useCallback, useRef } from "react";
import { FaShoppingBasket, FaSpa, FaWineBottle } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { FaFilter } from "react-icons/fa6";
import { MdCasino, MdLocalBar, MdLocalCafe, MdOutlineRestaurant, MdSelectAll } from "react-icons/md";
import { TbHotelService } from "react-icons/tb";

import styles from "./FilterControl.module.css";
import { controlButton, button } from "../../css/map-list-opener.module.css";
import { CSSTransition } from "react-transition-group";
import { ControlsTooltip } from "./ControlsTooltip";

import { canHover } from "../../utils/can-hover";

const size = 16;

function FilterControl({ filterType, setFilterType, label }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const { i18n } = useTranslation();
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

    const handleMouseEnter = () => {
        if (canHover()) {
            setShowTooltip(true);
        }
    };

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
        <div className="relative">
            <button
                aria-label={label}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setShowTooltip(false)}
                className={`${controlButton} ${styles.filterOpenButton}`}
                onClick={toggleFilterOpen}
            >
                <FaFilter />
                <div className={`${styles.cornerIcon} ${filterType !== "mind" && styles.showCornerIcon}`}></div>
            </button>
            <div className={` ${styles.filterPanelWrapper} ${filterOpen && styles.filterOpen}`} key={filterOpen ? "open" : "closed"}>
                <div className={`${styles.filterPanel}`}>
                    {options.map((option, i) => (
                        <div
                            key={`${option.type}-${i}`}
                            className={`${filterType === option.type && styles.selectedRow}
                                ${styles.filterRow}
                                ${i !== options.length - 1 && styles.filterRowSeparator}`}
                            onClick={() => {
                                setFilterType(option.type);
                                setFilterOpen(false);
                            }}
                        >
                            <button className={`${styles.filterButton} ${button}`}>{option.icon}</button>
                            <span>{getTranslation(i18n.language, option)}</span>
                        </div>
                    ))}
                </div>
            </div>
            <CSSTransition
                mountOnEnter
                unmountOnExit
                in={!filterOpen && showTooltip}
                classNames="ControlsTooltip"
                timeout={200}
                nodeRef={tooltipRef}
            >
                <ControlsTooltip message={label} ref={tooltipRef} />
            </CSSTransition>
        </div>
    );
}

export default FilterControl;
