function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState(''); 

  function handle(){

    var balanceUrl = `/account/balance/${email}`;
    var currentBal = 0;
    (async () => {
      var res = await fetch(balanceUrl);
      var balanceJson = await res.json();

      props.setShow(true);
      if (balanceJson) currentBal = balanceJson.balance;
    })()
    .then(() => {
      var newBalance = +currentBal + +amount;
      var depositUrl = `/account/depositOrWithdraw/${email}/${newBalance}`;
      (async () => {
        var res = await fetch(depositUrl);
        var updateCount = await res.json();

        console.log(updateCount);
      })();
      props.setShow(false);
    });
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}