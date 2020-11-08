// ADD NEW ITEM TO END OF LIST
var end_el = document.createElement('li');
end_el.textContent = 'cream';
var ulist = document.querySelector('ul');
ulist.appendChild(end_el);

// ADD NEW ITEM START OF LIST
var start_el = document.createElement('li');
start_el.textContent = 'kale';
var ulist = document.querySelector('ul');
ulist.insertBefore(start_el, ulist.childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var x = document.getElementById('page').querySelectorAll('li');
/*x[0].classList.add('cool');
x[1].classList.add('cool');
x[2].classList.add('cool');
x[3].classList.add('cool');
x[4].classList.add('cool');
x[5].classList.add('cool');*/
for(var i = 0; i < x.length; i++)
{
  x[i].classList.add('cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
