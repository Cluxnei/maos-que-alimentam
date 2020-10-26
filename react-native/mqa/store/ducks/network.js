export const Types = {
  NETWORK_ONLINE: 'NETWORK_ONLINE',
  NETWORK_OFFLINE: 'NETWORK_OFFLINE',
};

const INITIAL_STATE = {
  online: false,
};

export default function network(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.NETWORK_ONLINE:
      return state.online ? state : {...state, online: true};
    case Types.NETWORK_OFFLINE:
      return state.online ? {...state, online: false} : state;
    default:
      return state;
  }
}

export const Creators = {
  online: () => ({type: Types.NETWORK_ONLINE}),
  offline: () => ({type: Types.NETWORK_OFFLINE}),
};
