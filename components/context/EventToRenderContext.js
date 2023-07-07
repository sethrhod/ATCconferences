import React from 'react'

const EventToRenderContext = React.createContext({
    eventToRender: null,
    setEventToRender: () => {},
});

export default EventToRenderContext;
