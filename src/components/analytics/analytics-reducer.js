export function analyticsReducer(state, action) {
    if (import.meta.env.MODE === "development") {
        console.log(`==== analytics action dispatched: ${action.type} ====`);
        console.log("action: ", action);
        console.log(`========`);
    }
    switch (action.type) {
        case "OpenPopup":
            return {
                event: "event",
                eventProps: {
                    action: "open popup",
                    category: "map",
                    label: `${action.payload.name} (id: ${action.payload.id})`,
                },
            };
        case "CloseOnePercentBanner":
            return {
                event: "event",
                eventProps: {
                    action: "dismiss one percent tax donation banner",
                    category: "banner",
                },
            };
        default:
            return state;
    }
}
