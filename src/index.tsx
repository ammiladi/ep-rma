import React, { useContext } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore
import ReactDOM from 'react-dom'
import { AuthContext, AuthProvider, TAuthConfig, IAuthContext } from 'react-oauth2-code-pkce'

// Get info from http://localhost:8080/realms/test/.well-known/openid-configuration

const authConfig: TAuthConfig = {
  clientId: 'mona-app-oidc',
  authorizationEndpoint: 'https://rrma-recette.mgen.fr/auth/realms/adherant/protocol/openid-connect/auth',
  logoutEndpoint: 'https://rrma-recette.mgen.fr/auth/realms/adherant/protocol/openid-connect/logout',
  tokenEndpoint: 'https://rrma-recette.mgen.fr/auth/realms/adherant/protocol/openid-connect/token',
  redirectUri: 'http://localhost:3002/',
  scope: 'profile openid',
  logOut: (state?: string, logoutHint?: string) => {},
  extraAuthParameters: { mutuelle: '' },
  // Example to redirect back to original path after login has completed
  // preLogin: () => localStorage.setItem('preLoginPath', window.location.pathname),
  // postLogin: () => window.location.replace(localStorage.getItem('preLoginPath') || ''),
  decodeToken: true,
  autoLogin: true,
}

function LoginInfo(): JSX.Element {
  const errorPage = window.location.pathname=="/error";
  if (errorPage) {
    return (
      <>
        <div style={{ color: 'red' }}>An error occurred during authentication:  </div>
        <button onClick={() => logOut()}>Logout</button>
      </>
    )
  }else{
  const { tokenData, token, login, logOut, idToken }: IAuthContext = useContext(AuthContext)
 
 
  return (
    <>
      {token && !errorPage ? (
        <>
          <div>
            <h4>Access Token (JWT)</h4>
            <pre
              style={{
                width: '400px',
                margin: '10px',
                padding: '5px',
                border: 'black 2px solid',
                wordBreak: 'break-all',
                whiteSpace: 'break-spaces',
              }}
            >
              {token}
            </pre>
          </div>
          <div>
            <h4>Login Information from Access Token (Base64 decoded JWT)</h4>
            <pre
              style={{
                width: '400px',
                margin: '10px',
                padding: '5px',
                border: 'black 2px solid',
                wordBreak: 'break-all',
                whiteSpace: 'break-spaces',
              }}
            >
              {JSON.stringify(tokenData, null, 2)}
            </pre>
          </div>
          <button onClick={() => logOut()}>Logout</button>
        </>
      ) : (
        <>
          <div>Login M@naV3 </div>
          <button onClick={() => login()}>Login</button>

        </>

      )}
    </>
  )
  }
}


const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <div>
    <div>
      <h1>M@na v3</h1>
    </div>
    <AuthProvider authConfig={authConfig}>
      {/* @ts-ignore*/}
      <LoginInfo />
    </AuthProvider>
  </div>,
  document.getElementById('root')
)
