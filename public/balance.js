function Balance(){
  const [show, setShow]     = React.useState(false);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={<BalanceForm show={show} setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    {!props.show ? '' :
    <h5>${props.balance}</h5>}
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  
    

  function handle(){
    const url = `/account/balance/${email}`;
    (async () => {
      var res = await fetch(url);
      var balanceJson = await res.json();

      props.setShow(true);
      if (balanceJson) setBalance(balanceJson.balance);

      console.log(balance);
    })();
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

  <BalanceMsg balance={balance} setShow={props.setShow} show={props.show}/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}