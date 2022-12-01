function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [token, setToken] = React.useState(sessionStorage.getItem('token'));

  if (success || token) {
    return (
      <Card
        bgcolor="secondary"
        header="Login"
        status={status}
        body={
          (show && !token) ? 
          <LoginForm setToken={setToken} setSuccess={setSuccess} setShow={setShow} setStatus={setStatus}/> :
          <LoginMsg setToken={setToken} setShow={setShow} setStatus={setStatus}/>}
      />
    ) 
  }
  else {
    return (
      <Card
        bgcolor="secondary"
        header="Login"
        status={status}
        body={
          show ? 
          <LoginForm setToken={setToken} setSuccess={setSuccess} setShow={setShow} setStatus={setStatus}/> :
          <FailureMsg setToken={setToken} setShow={setShow} setStatus={setStatus}/>}
      />
    ) 
  }
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        sessionStorage.clear();
        props.setToken('');
        window.location.reload(false);
      }
      }>
        Sign Out
    </button>
  </>);
}

function FailureMsg(props){
  return(<>
    <h5>Authentication Failed</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  
  function handle(){
    const url = `/account/login/${email}/${password}`;
    (async () => {
      var res = await fetch(url);
      var check = await res.json();

      props.setShow(false);
      if (check.token) {
        props.setSuccess(true);

        var token = check.token;

        sessionStorage.setItem('token', JSON.stringify(token));
        props.setToken(token);
        window.location.reload(false);
      }

      console.log(check);
    })();
  }

  // function googleLogin() {
  //   const url = `/account/loginWithGoogle`;
  //   (async () => {
  //     var token = await fetch(url);

  //     props.setShow(false);
  //     if (token) props.setSuccess(true);

  //     console.log(token);
  //   })();
  // }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button><br/>
    
    
    

    </>);
    
}