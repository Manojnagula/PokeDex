function useDebounce(cb, Delay=700)
{
    let timerId;
    return (...args)=>{
        clearTimeout(timerId)
       timerId = setTimeout(()=>{
            cb(...args)
        },Delay)
    }
}

export default useDebounce;