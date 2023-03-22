import React from 'react';
import { Container, Typography, Box, TextField, ButtonGroup, Button, Snackbar, Alert, ListItem, List, ListItemText, Divider, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import "./App.css";

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      many: "[70,26,26,49,76,56,2,65,52]",
      items: [],
      nav: "sort",
      count: 10,
      binoms: []
    };
    this.change = this.change.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  change = (e,t) => {
    const {value} = e.target;
    this.setState({[t]:  value});
  };
  handleClose = () => { this.setState({open: false}); }
  itemPush = (many,n1,n2,el) => {
    return (
      <>
        {el} 
        {many.map((x,index) => {
          return <b style={{color: index==n1 ? "#F0E68C" : (index==n2 ? "#DDA0DD" : "#9ACD32")}}>{Number(x)}{index<many.length-1 && ", "}</b>;
        })}
        <Divider/>
      </>
    );
  };
  ifPush = (str,col) => { return <><b className="num" style={{color: col ? col : "red"}}>{str}</b><Divider/></>; };
  //
  bubbleSort = async () => {
    await this.setState({items:[],text:null});
    let {many,items} = this.state;
    try{ many=JSON.parse(many) } catch(e){ return this.setState({open:true,alert:"error"}); };
    for(let i=0; i<many.length; i++){
      for(let j=0; j<many.length-i-1; j++){
        if(many[j]>many[j+1]){
          [many[j], many[j+1]] = [many[j+1], many[j]];
          items.push(this.itemPush(many,j,j+1));
        } else items.push(this.ifPush(many[j]+">"+many[j+1]));
      }
    };
    if(items.length>0) this.setState({items,text:"Cортировка пузырьком:",open:true,alert:"success"});
    else this.setState({open:true,alert:"error"});
  }
  //
  insertSort = async () => {
    await this.setState({items:[],text:null});
    let {many,items} = this.state;
    try{ many=JSON.parse(many) } catch(e){ return this.setState({open:true,alert:"error"}); };
    for(let i=0; i<many.length; i++){
      let a = many[i], j;
      for(j=i;j>0; j--){
        console.log(j)
        if(many[j-1]>a){
          many[j] = many[j-1];
          items.push(this.ifPush(many[j-1]+">"+a,"green"));
        } else { 
          many[j] = a;
          items.push(this.itemPush(many,j,i,this.ifPush(many[j-1]+"≤"+a)));
          break;
        }
      };
      many[j] = a;
      //items.push(this.itemPush(many,j,i));
    }
    if(items.length>0) this.setState({items,text:"Cортировка вставками:",open:true,alert:"success"});
    else this.setState({open:true,alert:"error"});
  }
  //
  /*partition = (arr,start,end,items) => {
    const swap = (a,b) => { [arr[a], arr[b]] = [arr[b], arr[a]]; };
    for(let i=start; i<end; i++) if(arr[i]<arr[end]) swap(i,start++);
    swap(end,start);
    items.push(this.itemPush(arr,start,end));
    return start;
  }
  quick = async (arr, start=0, end=arr.length-1, items=[]) => {
    if(start>=end) return;
    const index = this.partition(arr,start,end,items);
    this.quick(arr,start,index-1,items);
    this.quick(arr,index+1,end,items);
    return items;
  }
  quickSort = async () => {
    await this.setState({items:[],text:null});
    let {many} = this.state;
    try{ many=JSON.parse(many) } catch(e){ return this.setState({open:true,alert:"error"}); };
    let items = await this.quick(many);
    if(items.length>0) this.setState({items,text:"Быстрая сортировка:",open:true,alert:"success"});
    else this.setState({open:true,alert:"error"});
  }*/
  quick = async (arr=[],left=0,right=arr.length-1,items=[]) => {
    if(arr.length> 1){
      let index = this.partition(arr, left, right,items);
      if(left<index-1) this.quick(arr, left, index-1,items);  
      if(index<right) this.quick(arr, index, right,items);
    }
    return items;
  }
  
  partition = (arr=[],left,right,items) => {
    const pivot = arr[Math.floor((right + left) / 2)];
    while (left <= right) {
      while(arr[left]<pivot){ items.push(this.ifPush(arr[left]+"<"+pivot,"green")); left++; }
      while(arr[right]>pivot){ items.push(this.ifPush(arr[right]+">"+pivot,"purple")); right--; } 
      if(left <= right){
        [arr[left], arr[right]] = [arr[right], arr[left]];
        if(left!=right) items.push(this.itemPush(arr,left,right));
        left++; right--;
      }
    }
    return left;
  }
  quickSort = async () => {
    await this.setState({items:[],text:null});
    let {many} = this.state;
    try{ many=JSON.parse(many) } catch(e){ return this.setState({open:true,alert:"error"}); };
    let items = await this.quick(many);
    if(items.length>0) this.setState({items,text:"Быстрая сортировка:",open:true,alert:"success"});
    else this.setState({open:true,alert:"error"});
  }
  //
  binomPush = (pas,ind) => {
    return (
      <>
        {pas.map((x,i) => {
          return <nobr><b style={{color: "#5b96f5"}}>{i==0 && <>{ind}. </>}{Number(x)>1 && x.toString()}{(pas.length-i-1>0 && <>x{pas.length-i-1>1 && <sup>{pas.length-i-1}</sup>}</>)}{(i>0 && <>y{i>1 && <sup>{i}</sup>}</>)}{i!=pas.length-1 && "+"}</b></nobr>;
        })}
        <Divider/>
      </>
    );
  }
  binom = async () => {
    let {count}=this.state, sh, binoms=""; count=parseInt(count); let n=Math.floor(count/2), a="",b="";
    for(let k=0;k<n+1;k++){
      if(k==0) sh=1n;
      else if(k==1) sh=BigInt(count);
      else sh=BigInt(Math.ceil(parseInt(sh)*((count-k+1)/k)));
      a += ((parseInt(sh)>1 ? (sh).toString():"")+(count-k>0 ? "x"+(count-k>1 ? "<sup>"+(count-k).toString()+"</sup>" : ""):"")+(k>0 ? "y"+(k>1 ? "<sup>"+(k).toString()+"</sup>" : ""):"")+(k<n+1?"+":""));
      b = ((k<n?"+":"")+(count-k!=k ? (parseInt(sh)>1 ? (sh).toString():"")+(k>0 ? "x"+(k>1 ? "<sup>"+(k).toString()+"</sup>" : ""):"")+(count-k>0 ? "y"+(count-k>1 ? "<sup>"+(count-k).toString()+"</sup>" : ""):"") : "")).concat(b);
    }
    binoms=a+b;
    this.setState({binoms});
  }

  render(){
    const {open,many,alert,items,text,nav,count,binoms} = this.state;
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      this.setState({nav: newValue});
    };
    return (
      <>
        {nav == "sort" ?
          <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '50ch' }}}
            noValidate
            autoComplete="off"
          >
            <center>
              <TextField
                label="Изначальное множество"
                multiline
                rows={3}
                value={many}
                onChange={(e) => this.change(e,"many")}
              />
              <Typography>Сортировка при помощи:</Typography>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={()=> this.bubbleSort()}>«пузырькового» алгоритма</Button>
                <Button onClick={()=> this.insertSort()}>алгоритма «вставками»</Button>
                <Button onClick={()=> this.quickSort()}>«быстрого» алгоритма</Button>
              </ButtonGroup>
            </center>
              {items.length>0 && <>
                <br/><Typography>{text}</Typography>
                <List>{items.map((x,ind) => { return <>{ind+1}. {x}</>; })}</List>
                <Typography>Всего шагов: {items.length}</Typography>
              </>}
          </Box>
        :
        <Box
          component="form"
          sx={{'& .MuiTextField-root': { m: 1, width: '50ch' }}}
          noValidate
          autoComplete="off"
        >
          <center>
            <Typography>Подсчёт Бином Ньютона для (x+y)<sup>n</sup></Typography>
            <TextField label="Введите степень n:" size="small" value={count} onChange={(e) => this.change(e,"count")} style={{width: 150}}/>
            <Button color="secondary" onClick={()=> this.binom()} style={{marginTop: 10}}>Рассчитать</Button>
          </center>
          <List styles={{ overflowY: 'scroll' }}><nobr><b style={{color: "#5b96f5"}}><div dangerouslySetInnerHTML={{__html: binoms}}/></b></nobr></List>
        </Box>}
        <Snackbar open={open} autoHideDuration={3000} onClose={this.handleClose} anchorOrigin={{ vertical: "buttom", horizontal: "right" }}>
          <Alert onClose={this.handleClose} severity={alert} sx={{ width: '100%' }}>
            {alert=="success" ? "Сортировка произошла успешно!"
            : "Сортировка провалена!"}
          </Alert>
        </Snackbar>
        <div style={{marginTop: 56}}/>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation value={nav} showLabels onChange={(event, newValue) => this.setState({nav:newValue})}>
            <BottomNavigationAction value="sort" label="Сортировки"/>
            <BottomNavigationAction value="binom" label="Бином Ньютона"/>
          </BottomNavigation>
        </Paper>
      </>
    );
  }
};
