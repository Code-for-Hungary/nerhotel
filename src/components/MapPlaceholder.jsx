import LoadingSpinner from "./ui/LoadingSpinner";

function MapPlaceholder() {
    return (
        <div
            className="markercluster-map leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
            style={{ position: "relative" }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate3d(-50%, -50%, 0)",
                }}
            >
                <LoadingSpinner size="64px" color="var(--nh-blue)" />
            </div>
        </div>
    );
}

export default MapPlaceholder;
