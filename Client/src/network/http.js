export default class HttpClient {
    constructor(baseURL){
        this.baseURL = baseURL
    }

    // 네트워크 처리는 웬만하면 promise와 async형태로 해줘야 한다.
    // 동기 처리로 할 경우 한번에 하나밖에 처리하기 때문이다.
    async fetch(url, options){
        const res = await fetch(`${this.baseURL}${url}`, {
            ...options,
            headers: {
                "Context-Type": "application/json",
                ...options.headers
            }
        });
        let data;
        try {
            data = await res.json();
        }catch (error) {
            console.error(error)
        }

        if(res.status > 299 || res.status < 200){
            // error가 났을 경우
            const message = data && data.message ? data.message : '문제가 발생하였습니다.'
            throw new Error(message);
        }
        return data;
    }
}