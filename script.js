
var squares= 
[
	[1,2,3,4,5,3,2,1],
	[6,6,6,6,6,6,6,6],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[12,12,12,12,12,12,12,12],
	[7,8,9,10,11,9,8,7]
]

var i,j,k;
var td,t,t2,t3,t4;
var type;
var selected,p,d,p2;
var move="w";
var checked=false,checker;
var ii,jj,kk,breaked=false;
var pp,ck;
var iii,s;
var debug,breaked2,p3;
var castle,m;
var piece,row;
var moves=document.getElementById('moves');
function checkCoords() {
	i=indexOf(this);
	checkMoves(Math.floor(i/8),i%8)
}
function indexOf(T)
{
	
	for(i=0;i<64;i++)
		if(td[i]==T)
			return i;
}

function checkMoves(r,c)
{
	
	rE(0,63);
	selected=[r,c];
	castle=[];
	if(squares[r][c]==11)	castle=	checkCastleW(r,c);
	else if(squares[r][c]==5)	castle=	checkCastleB(r,c);
	p=getPossibilities(r,c);
	p=checkPossibilities(p);
	if(castle.length>0)	p=p.concat(castle);
	if(p.length>0)
	{
		for(i of p)	
			glow(i[0],i[1])
		td[r*8+c].addEventListener("click",deselect,false);		
	}
	else deselect();

}
function checkCastleW(r,c)
{
	move="b";
	var cst=[];
	if(!checked&&r==7&&c==4)
	{
		m=b();
		p3=[];
		if(squares[7][0]==7&&squares[7][1]==0&&squares[7][2]==0&&squares[7][3]==0)
		{
			for(i of m)	p3=p3.concat(getPossibilities(i[0],i[1]))
			breaked=false;
			for(i=0;i<p3.length;i++)
				if(p3[i]==[7,0]||p3[i]==[7,1]||p3[i]==[7,2]||p3[i]==[7,3])
				{
					breaked=true;
					break;
				}
			if(!breaked) cst=[7,1];
		}
		p3=[];
		if(squares[7][5]==0&&squares[7][6]==0&&squares[7][7]==7)
		{
			for(i of m)	p3=p3.concat(getPossibilities(i[0],i[1]))
			breaked=false;
			for(i=0;i<p3.length;i++)
				if(p3[i]==[7,5]||p3[i]==[7,6]||p3[i]==[7,7])
				{
					breaked=true;
					break;
				}
			if(!breaked) cst=cst.concat([[7,6]]);
		}
	}
	move="w";
	return cst;
}
function checkCastleB(r,c)
{
	move="w";
	var cst=[];
	if(!checked&&r==0&&c==4)
	{
		m=w();
		p3=[];
		if(squares[0][0]==7&&squares[0][1]==0&&squares[0][2]==0&&squares[0][3]==0)
		{
			for(i of m)	p3=p3.concat(getPossibilities(i[0],i[1]))
			breaked=false;
			for(i=0;i<p3.length;i++)
				if(p3[i]==[0,0]||p3[i]==[0,1]||p3[i]==[0,2]||p3[i]==[0,3])
				{
					breaked=true;
					break;
				}
			if(!breaked) cst=[0,1];
		}
		p3=[];
		if(squares[0][5]==0&&squares[0][6]==0&&squares[0][7]==7)
		{
			for(i of m)	p3=p3.concat(getPossibilities(i[0],i[1]))
			breaked=false;
			for(i=0;i<p3.length;i++)
				if(p3[i]==[0,5]||p3[i]==[0,6]||p3[i]==[0,7])
				{
					breaked=true;
					break;
				}
			if(!breaked) cst=cst.concat([[0,6]]);
		}
	}
	move="b";
	return cst;
}
function deselect()
{
	
	rGlow();
	if(move=="w") aEW();
	else aEB();
}
function glow(x,y)
{
	
	td[x*8+y].className="g";
	td[x*8+y].addEventListener("click",movePiece,false);
}
function rGlowXY(x,y)
{
	
	td[x*8+y].className=(x%2^y%2)?"b":"w";
	td[x*8+y].removeEventListener("click",movePiece,false);
}
function rGlow()
{
	
	for(i of p)
		rGlowXY(i[0],i[1]);	
}
function aE(l,u)
{
	
	for(i=l;i<=u;i++)	td[i].addEventListener("click",checkCoords,false);
}
function rE(l,u)
{
	
	for(i=l;i<=u;i++)	td[i].removeEventListener("click",checkCoords,false);
}
function isBlack(r,c)
{
	
	if(r<8&&r>-1&&c<8&&c>-1)
	return squares[r][c]<7&&squares[r][c]>0;
}
function isWhite(r,c)
{
	
	if(r<8&&r>-1&&c<8&&c>-1)
	return squares[r][c]>6;
}
function aEW()
{
	
	for(i=0;i<8;i++)
		for(j=0;j<8;j++)
			if(isWhite(i,j))
				td[i*8+j].addEventListener("click",checkCoords,false);
}
function aEB()
{
	
	for(i=0;i<8;i++)
		for(j=0;j<8;j++)
			if(isBlack(i,j))
				td[i*8+j].addEventListener("click",checkCoords,false);
}
function w()
{
	
	var w=[];
	for(i=0;i<8;i++)
		for(j=0;j<8;j++)
			if(isWhite(i,j))
				w.push([i,j]);
	return w;
}
function b()
{
	
	var b=[];
	for(i=0;i<8;i++)
		for(j=0;j<8;j++)
			if(isBlack(i,j))
				b.push([i,j]);
	return b;
}
function getPossibilities(r,c)
{
	p=[];
	t=squares[r][c];
	if(t==1||t==7)
	{
		for(i=r-1;i>-1;i--)
		{
			p.push([i,c]);
			if(squares[i][c]>0)
				break;
		}
		for(i=r+1;i<8;i++)
		{
			p.push([i,c]);
			if(squares[i][c]>0)
				break;
		}
		for(i=c-1;i>-1;i--)
		{
			p.push([r,i]);		
			if(squares[r][i]>0)
				break;	
		}
		for(i=c+1;i<8;i++)
		{
			p.push([r,i]);
			if(squares[r][i]>0)
				break;
		}
	}
	else if(t==2||t==8)
	{
		if(r>1)
		{
			if(c>0)	p.push([r-2,c-1]);
			if(c<7)	p.push([r-2,c+1]);
		}
		if(r<6)
		{
			if(c>0)	p.push([r+2,c-1]);
			if(c<7)	p.push([r+2,c+1]);
		}
		if(c>1)
		{
			if(r>0)	p.push([r-1,c-2]);
			if(r<7)	p.push([r+1,c-2]);
		}
		if(c<6)
		{
			if(r>0)	p.push([r-1,c+2]);
			if(r<7)	p.push([r+1,c+2]);
		}	
	}
	else if(t==3||t==9)
	{
		j=r+c;
		for(i=c-1;i>-1;i--)
		{
			if(j-i>-1&&j-i<8)
			{
				p.push([j-i,i]);
				if(squares[j-i][i]>0)
					break;
			}
			else break;	
		}
		for(i=c+1;i<8;i++)
		{
			if(j-i>-1&&j-i<8)
			{
				p.push([j-i,i]);
				if(squares[j-i][i]>0)
					break;
			}	
		}
		j=c-r;
		for(i=r-1;i>-1;i--)
		{
			if(j+i<8&&j+i>-1)
			{
				p.push([i,j+i]);
				if(squares[i][j+i]>0)
					break;
			}	
		}
		for(i=r+1;i<8;i++)
		{
			if(j+i<8&&j+i>-1)
			{
				p.push([i,j+i]);
				if(squares[i][j+i]>0)
					break;
			}	
		}
	}
	else if(t==4||t==10)
	{
		for(i=r-1;i>-1;i--)
		{
			p.push([i,c]);
			if(squares[i][c]>0)
				break;
		}
		for(i=r+1;i<8;i++)
		{
			p.push([i,c]);
			if(squares[i][c]>0)
				break;
		}
		for(i=c-1;i>-1;i--)
		{
			p.push([r,i]);		
			if(squares[r][i]>0)
				break;	
		}
		for(i=c+1;i<8;i++)
		{
			p.push([r,i]);
			if(squares[r][i]>0)
				break;
		}
		j=r+c;
		for(i=c-1;i>-1;i--)
		{
			if(j-i>-1&&j-i<8)
			{
				p.push([j-i,i]);
				if(squares[j-i][i]>0)
					break;
			}
			else break;	
		}
		for(i=c+1;i<8;i++)
		{
			if(j-i>-1&&j-i<8)
			{
				p.push([j-i,i]);
				if(squares[j-i][i]>0)
					break;
			}	
		}
		j=c-r;
		for(i=r-1;i>-1;i--)
		{
			if(j+i<8&&j+i>-1)
			{
				p.push([i,j+i]);
				if(squares[i][j+i]>0)
					break;
			}	
		}
		for(i=r+1;i<8;i++)
		{
			if(j+i<8&&j+i>-1)
			{
				p.push([i,j+i]);
				if(squares[i][j+i]>0)
					break;
			}	
		}
	}
	else if(t==5||t==11)
	{
		if(r>0)
		{
			if(c>0)	p.push([r-1,c-1]);
			if(c<7)	p.push([r-1,c+1]);
			p.push([r-1,c]);
		}
		if(r<7)
		{
			if(c>0)	p.push([r+1,c-1]);
			if(c<7)	p.push([r+1,c+1]);
			p.push([r+1,c]);
		}
		if(c>0)	p.push([r,c-1]);
		if(c<7)	p.push([r,c+1]);
	}
	else if(t==6||t==12)
	{
		if(move=="w")
		{
			if(squares[r-1][c]==0)
			{
				p.push([r-1,c]);
				if(r==6&&squares[4][c]==0)	p.push([4,c]);
			}
			if(isBlack(r-1,c-1))	p.push([r-1,c-1]);
			if(isBlack(r-1,c+1))	p.push([r-1,c+1]);
			
		}
		else 
		{
			if(squares[r+1][c]==0)
			{
				p.push([r+1,c]);
				if(r==1&&squares[3][c]==0)	p.push([3,c]);
			}
			if(isWhite(r+1,c-1))	p.push([r+1,c-1]);
			if(isWhite(r+1,c+1))	p.push([r+1,c+1]);
		}		
	}
	if(move=="w")
	{	
		for(i=0;i<p.length;i++)
		{
			if(isWhite(p[i][0],p[i][1]))
			{
				p=p.slice(0,i).concat(p.slice(i+1));
				i--;
			}
		}
	}
	else
	{
		for(i=0;i<p.length;i++)
			{
				if(isBlack(p[i][0],p[i][1]))
				{
					p=p.slice(0,i).concat(p.slice(i+1));
					i--;
				}
			}	
	}
	return p;
}
function checkPossibilities(px)
{	
	t4=	squares[selected[0]][selected[1]];
	squares[selected[0]][selected[1]]=0;
	if(move=="w")
	{
		move="b";
		checker=b();
	}	
	else
	{
		move="w";
		checker=w();
	}	

	for(ii=0;ii<px.length;ii++)
	{
		p2=px;
		t3=squares[px[ii][0]][px[ii][1]];
		squares[px[ii][0]][px[ii][1]]=t4;
		breaked=false;
		second:
	{
			for(jj of checker)
		{
			if(!(jj[0]==px[ii][0]&&jj[1]==px[ii][1]))
			{
				t2=getPossibilities(jj[0],jj[1]);
				for(kk of t2)
				{
					if(squares[kk[0]][kk[1]]==5||squares[kk[0]][kk[1]]==11)
					{
						px=px.slice(0,ii).concat(px.slice(ii+1));
						ii--;
						breaked=true;
						break second;
					}
				}
			}
		}
	}
			if(breaked)
				squares[p2[ii+1][0]][p2[ii+1][1]]=t3;
			else
				squares[p2[ii][0]][p2[ii][1]]=t3;
	}
	if(move=="w")
		move="b";
	else
		move="w";
	squares[selected[0]][selected[1]]=t4;
	return px;
}
function movePiece(r,c)
{
	
	rE(0,63);
	if(r&&c)
		d=[r,c];
	else 
		d=indexOf(this);
	d=[Math.floor(d/8),d%8];
	rGlow();
	td[selected[0]*8+selected[1]].querySelector("p").style.transform="translate("+(d[1]-selected[1])*100+"%,"+(d[0]-selected[0])*100+"%)";
	td[selected[0]*8+selected[1]].removeEventListener("click",deselect);
	if(debug)debugger;
	if((squares[selected[0]][selected[1]]==5||squares[selected[0]][selected[1]]==11)&&d[1]-selected[1]>1)
	{
		if(move=="w")
		{
			if(d[1]==1)
			{
				td[57].querySelector("p").style.transform="translate(300%,0%)";
				castle=[7,0,3,7];
			}	
			if(d[1]==6)
			{
				castle=[7,7,5,7];
				td[63].querySelector("p").style.transform="translate(-200%,0%)";
			}	
		}
		else
		{
			if(d[1]==1)
			{
				td[0].querySelector("p").style.transform="translate(300%,0%)";
				castle=[0,0,3,1];
			}	
			if(d[1]==6)
			{
				castle=[0,7,5,1];
				td[7].querySelector("p").style.transform="translate(-200%,0%)";
			}	
		}
		setTimeout(function()
		{
			squares[castle[0]][castle[1]]=0;
			squares[castle[0]][castle[2]]=castle[3];
			td[castle[0]*8+castle[2]].innerHTML=td[castle[0]*8+castle[1]].innerHTML;
			td[castle[0]*8+castle[1]].innerHTML="<p></p>";
			td[castle[0]*8+castle[2]].querySelector("p").style="";
		},1000);
	}
	else if(squares[selected[0]][selected[1]]==6&&d[0]==7)
	{
		promotionB();
	}	
	else if(squares[selected[0]][selected[1]]==12&&d[0]==0)
	{
		promotionW();
	}	
	setTimeout(realMovePiece,1000);	
	squares[d[0]][d[1]]=squares[selected[0]][selected[1]];
	squares[selected[0]][selected[1]]=0;
	p=getPossibilities(d[0],d[1]);
	if(checked)	checked=false;
	for(i of p)
		if(squares[i[0]][i[1]]==5||squares[i[0]][i[1]]==11)
		{
			checked=true;
			checkCM();
		}	
	switch(squares[d[0]][d[1]])
	{
		case 1: piece="R";break;
		case 2: piece="N";break;
		case 3: piece="B";break;
		case 4: piece="Q";break;
		case 5: piece="K";break;
		case 6: piece="P";break;
		case 7: piece="R";break;
		case 8: piece="N";break;
		case 9: piece="B";break;
		case 10: piece="Q";break;
		case 11: piece="K";break;
		case 12: piece="P";break;
	}
	switch(d[0])
	{
		case 0: row="a";break;
		case 1: row="b";break;
		case 2: row="c";break;
		case 3: row="d";break;
		case 4: row="e";break;
		case 5: row="f";break;
		case 6: row="g";break;
		case 7: row="h";break;
	}
	moves.innerHTML+="<br>"+piece+" "+row+(8-d[1]);
}
function realMovePiece()
{
	update.innerHTML="";
	td[selected[0]*8+selected[1]].querySelector("p").style="";
	td[d[0]*8+d[1]].innerHTML=td[selected[0]*8+selected[1]].innerHTML;
	td[selected[0]*8+selected[1]].innerHTML="<p></p>";	
	if(move=="w")
	{
		move="b";
		aEB();
	}
	else if(move=="b")
	{
		move="w";
		aEW();
	}
}
function checkCM()
{
	s=selected;
	if(move=="w")
	{
		move="b";
		ck=b();
	}		
	else
	{
		move="w";
		ck=w();
	}	
		breaked2=false;
	for(iii of ck)
	{
		selected=[iii[0],iii[1]];
		p=getPossibilities(iii[0],iii[1]);
		p=checkPossibilities(p);
		if(p.length>0)
		{	
			breaked2=true;
			break;
		}
	}
	if(breaked2)
	{
		if(move=="w")	move="b";
		else	move="w";
		update.innerHTML="CHECK";
	}
	else
	{	
		if(move=="w")	update.innerHTML="CHECKMATE<br>BLACK WINS";
		if(move=="b")	update.innerHTML="CHECKMATE<br>WHITE WINS";
		move="f";		
	}
	selected=s;
}
td=	document.querySelectorAll("td");
aE(47,63);