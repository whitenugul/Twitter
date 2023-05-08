const TOKEN = 'token';

export default class TokenStorage {
    saveToken(token){
        // 토큰 저장
        localStorage.setItem(TOKEN, token) // 꼭 쓸 필요는 없다.
    }

    getToken(token){
        // 저장된 토큰 가져오기
        return localStorage.getItem(TOKEN)
    }

    clearToken(token){
        // 로그아웃 했을 때 토큰 지우기
        localStorage.clear(TOKEN)
    }
}