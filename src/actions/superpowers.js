export const GET_POWERS_REQUEST = "GET_POWERS_REQUEST";
export const getPowersRequest = () => {
	type:GET_POWERS_REQUEST
}

export const GET_POWERS_SUCCESS = "GET_POWERS_SUCCESS";
export const getPowersSuccess = powers => {
	type:GET_POWERS_SUCCESS,
	powers
}

export const GET_POWERS_ERROR = "GET_POWERS_ERROR";
export const getPowersSuccess = () => {
	type:GET_POWERS_ERROR
}

export const getPowers = () => dispatch => {

}