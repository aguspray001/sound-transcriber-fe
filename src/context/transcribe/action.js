import { FAILED_GET_TRANSCRIBE, SUCCESS_GET_TRANSCRIBE } from "./types";


const getTranscribe = async (context) => {
    const {dispatch} = context;

    try{
        // fetch data
        
        // input data to reducer
        dispatch({type: SUCCESS_GET_TRANSCRIBE});
    }catch(e){
        dispatch({type: FAILED_GET_TRANSCRIBE});
    }
}