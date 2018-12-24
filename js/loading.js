var canvas = document.getElementById("scene");
var ctx = canvas.getContext("2d");
var particles = [];

function drawScene() {
  canvas.width = png.width * 3;
  canvas.height = png.height * 3;
  ctx.drawImage(png, 0, 0);
  var data = ctx.getImageData(0, 0, png.width, png.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var y = 0, y2 = data.height; y < y2; y++) {
    for (var x = 0, x2 = data.width; x < x2; x++) {
      var p = y * 4 * data.width + x * 4;
      if (data.data[p + 3] > 129) {
        var particle = {
          x0: x,
          y0: y,
          x1: png.width / 2,
          y1: png.height / 2,
          speed: Math.random() * 4 + 2,
          color:
            "rgb(" +
            data.data[p] +
            "," +
            data.data[p + 1] +
            "," +
            data.data[p + 2] +
            ")"
        };
        TweenMax.to(particle, particle.speed, {
          x1: particle.x0,
          y1: particle.y0,
          delay: y / 250,
          ease: Elastic.easeOut
        });
        particles.push(particle);
      }
    }
  }
  requestAnimationFrame(render);
}
var render = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0, j = particles.length; i < j; i++) {
    var particle = particles[i];
    //ctx.fillStyle = particle.color;
    i < particles.length / 2 && particle.x1 < canvas.width / 2
      ? (ctx.fillStyle = "#000000")
      : (ctx.fillStyle = "#000000");
    ctx.fillRect(particle.x1 * 3, particle.y1 * 3, 2, 2);
  }
  requestAnimationFrame(render);
};

var clearFrame = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = [];
  drawScene();
};

var png = new Image();
png.onload = drawScene;
png.src =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAABbCAQAAAD37huEAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAC4jAAAuIwF4pT92AAAU2UlEQVR42u2deZxNdf/A3/deYxZjz741RKmsTyWabI9EsvxSlgqPB6WI8kjJ87Q+VBRFioeUKGQpvKjsOyHGkqXCYJAylhlj1nu/vz/mDvds955z7rn3Tpz3/WfOOd99zud7vt/v5/P9fMHGxsbGxsbGxsZiHAA4mUVZA7HcXOA0v5HEz2REsPRxdKE1ZTjNd3yPO4IlKRwMpL1FKb3Cz5GuTGHCRQrC1O88S+hNyYiUujGHfEqyhkqRbsaI87HJ/6Ly1zzSVSlcmBeQ/N85xlE5zGVO4A9ZKXYTH+mGjDC2gFiO05JUyjKcg7xC0TCW/G3Kye405Pkw5m9zQ2CNgACUYDTbqBumcsfTWeXuE945lY2NRVgnIACN2GLZNNE/1YhRuVuFuLDkbnPDYK2AQCkW0TUM5c5WvZtnr2TZAE7iZT/TI4silhcuhlmksi7ETXCCs1RQ3N1PVojz/WvhNt1hiEgXPSgS2CXp+jOoTbq5pKwXEIhlLneREtImyGMKr8nuCSaFNM+/HpN5y2TMS5EuelA4iZcIiCPYuWmwy7zK3zLLB29yYlkvy3NKyPMs7MiXed+JdIEiRG3ckna4TAmzSYXqlWrPIyFuhEw6MPnqXOQSwxmEJ8R52txw+B9i5TGWXMVdF3FUpTE1/YiXgzdZQk5Iy36ZwbzGfZTmDJsjavJic52jNcTKpJhmHAcNmUmOn2FWOFazbHyxh1j5FIohliCJPjzAac0Q/SLbSjY2wRPsHGQ9bUjVeNaCmyJdPRub4Ah+kn6Q5zSexHFvpKtnYxMcVqxifc0+jSd3Rbp6NjbBYYWAuJmn8aROpKtnYxMc1uhBNmvcrxjp6tnYBIc1piYnNe5LNzA5iFUJ41Y1PHRQlKIIcshVtQtyEaWaY45EWRirskPFo2GV4yIKJx5yDdgvOXARhcNgrEA4KYILgZu8v5BNVBTFiMMJZHGZbMMlLy/prDM1jF2KEEMsggyyJDnESd4HuXGigxIqxibZeiz3rBEQfRrsahxUubuGjpLrKO6nM4ncTByCy5xkGwvZQJ4kVDc+Uc2jNbt8rj6klyLEWWpLlJ9RNKUdTahFKaLI4RJH2c53bFFRkV6jOg+SyB1UJh4XuaRxkj2sZUUQVkzFSaQFjUigNNF4yOY8yexhE5u4aDrVUFOe1jSnMQmUpCgOIJcMTrGPzazkV53vhpM9lPe5/pLekudlaUMLGnIzJSmK4Ar1OeHzfBYP+VzJba/i+E1FYCcxQm8lzSgKfWmmoSrcIAlVQzXMSp8QMQzksGqon6gvSauPRo53S0LNUAlxxqeviWWQRn6CQ/xT9SvlIJGlZGnEusCHVNXb7D7cwVRSNVWul/iSZjoM7sKrKHTRjsVk+FEV57GTpymuIy0nZyUxZ/s8q8dM0hVpJ0jiLzFhLzjeSFWDE5AXNIqwQBIqkIAkss9PdZpJ0rJCQFpyIEATrudmWU3LMYu8ALHO85ShuV01ZpId8N/pZjl3BkgpnALSkq14dL2IJxkQcKSiJSBxvK/RGYVJQKyYpDvoofHkqIE0hrHazwtwlh0WlNQ3v5dYEXCDcHO2cI/PdVN28CSuALFKM4XJGnMkZTn6sofeOnbzO2nPdoYXCovleKayint1GpFX5X+sppaJfMqxkmFER7KqVjR3B1m/fY09utMYzXt+X5Lv/c4IjOJgHG/reoUrsZx63r87s5oaOtMfyHgdr0800/iU0rrLHcs4Zkf2hQFqsYWnAnYTUprzI20N5lOc72TjhggQvIBU4GONV8GtufwrZxAjA7xOSy2t9XCG6d5CU5b5lAAe4mvVVTjtOvUJECKexfQzvJWnJ/PD6j1GTiM2Xe0yjFCWpTxuILyDqfwtgvX0EqyAlGcx1TSeJUnWGbS5jXEBQmSyyrIaR9GV/xp6LW9lFHX50uBr6eA9lU3B14hmHg+aqkFHJkbMe8udfKeh3RJcIYUjJHNRY+WqKJ/TTXdOHTQH7mElmGXeKDozTjGNvcYsXUt89VgYsGfeaOEW0LLMMRznGdpRykROLzJc45mD8ZKFSWMMYCNfWtYi+inPN6pCf4gvWcEh0hFADNVpTg9aKN6uKGZwSte4Ilq1E/OQRR6xKoPjUZIpdxVmSWJn0ZUriji6NoX7FxAn96sqU2KoQmPaUdNP3HPM0lMAKvjtZ/OxdoBlnOKyRWa9DOANDbVkNwZqxvJwkTRcFKekxpfCyXhWcTZg/nfwpOEy7+CwxhMX07hFcTeZkSyUzBCz+IVfmM7feIe/y2pQjNncw58BS/GIbGxzmG9Zx0EukkcxbqISf0ieS60BayMk+brZRJrhlpBU3eo96YJXFLnUMJmSW7akB8Es84b310u1vctzRiP8rwzjVmIAB3HU5UWOaIScqJKuFa5HB2u+JX1VlnXn+l1icDFEZZF2lorYy5d5fX976GhwpGPhhqlQCcghFQ2KXgHxcIlkkkn1VnOPykzJKgE5xocMoDsDeM+vFkb6c7OVN+lDDwYzQ+Ej2Pc3X7W9J6mGzebfKoPNOF5V3bd5WUUhGUoBKcVpxf9prI61rA5cVrReC0UoLQFx856hpZF8Cr2A5HC/Si56BOQAQ6hNUZw4KUIFuvCVwr0PWCMgGTwnWTJ10lmzZ/f9Jcm02iUYr6ky+13lFarBFZWQV2QmN750VlWWvaoIF0oBGakIqdeLTGdyZTHXKr4h6gLiZpCp97mQC4iHF1RzCSQg6QzS/SkNXkDOq2pv6vj9HggEC1R7tDc1QqsND8eptpn6YKyAgSoieFjRWqETkBhOycJtM6CPeV1R2yayEOoC8pruHKQUcgF5T2Nq6V9A/lQ0mj+CFZBcTbXVP/yWcr2qT2Aoyl6NGA/IQsaofqW+DrBw62KtilA1kIUKnYB0koXKUeTtj2j2y+JPkYVQE5D1BpWR1ygUThvU8TCGERg30s7mUX60uCz+mM4KjSdz/WhvMuinYSKdw8cacarIrluq6BFyeC1Am7mZoLjnoE24mkvhoWaeASsJyOYN2Z3OAe0YPLxYGDwtWysgafyTf5ty3/Yu68NY6wxGaz7L0hQdmMJvms9+0Ph3yld51LQf61Q3AkhZq6ILahraZrqKUhSNOnn9VrZnqGLAhfPNFlvfmcQ637yCNQzmkKm4pxkb1lov9ask2qVx38NHfmId57ziSB9ANmNxqJ7dVFGXzkjZmdXD6bc7+tyEt2K1zW/VZeeHHWWnwVRzWcRQyZ2m/OQ3xiIT45AQYJWA7OYtlpj+JH4SZr+IC/0+1RpibSXZTywPZ1QFREoct6rcrW9SEVmFOC77eX5WU9iNIbe9WmtilLBaJiCB7Lm2WFLyoAleQNJYwgw2BDFe9PBVWOucyya/z7WEdSX+0eNgv7rGJN8ccZTxKyBWIV+J220ijSSk2u2aAcL/GoZ66SCQgKh7180jnTP8yh42syVoD7y/cCysdU6RmSnoZXuA53qGBFV0hNGPg9I6DUKDQ76sYOb/dZYrEuWxf4ceuSq2UxHBv4BkUVm1PxWWuhPYFebR5jGTXuCt6NNKWVyX8Bw5J980e85EGnmkSQTE/4nEhWL+AXq+IKH10A7m+qNgMPf9cOswsQuMvn2GRkoVDuT6CDO5CtkCeaS3femkMGzgPB/m/Mwd0+Ym04K8rX6hg7JRNV1qMzNXh2z2lW0ijQgQiiPYjJIXfBJhwYrPvtoLLUy3gAiTgMg1MGackkdRUnJt8szAcFMYBORGQm0PxyVuNz2QvRCRUieYSKOCbL70e1hKHjS2gISXE7gVI/oSlDSpYA0Xcu80jUykIY+j3+NNRCkMc5AbiQsqOnynwqCxsLFXdt3KxHvTWna9z3AKEcEWkPDiUTXJ7KPLbrWsKW8iVpAiM0BJMHywRRT/J7tTSDTlgbAFJNyo6eMbK14fJQ5G8xOzuS0ipZYbcA42GL+zzPfNafZHpB6GsQUk3CxTWeB0MIFKAeI9Qn+ieIIkppmaJAfHAtl1D4P7QeRbnxZb6ggwEEVM7yyxBSTsnGG5yt2qLKSMn1gtmeH9J0fTn/1MMuUi2zxrZIaaUXxiQNX3ssyprIcZYS19tPnTMm0BCT8TVTUqTVnLHarhHfRiqWRPXByDOcA4yYEBoSVHYTjflPd1uq97WOHhZl0AU/dgUZ5O0tBsUraAhJ8NrFW9X58dfEBt2d0mfMNMFcul4gxXrAyFkmkKs8hneUfH+9OWr2Q+KT28GmJbq3SFXinwHE8DWw8SfjyMYIuqI9NYhjKUw+zkBDnEcjNN/LjLXqXhVCg0pDOCOZJvhoMRVONZP4f7uHiWcYqh2Oe6fTabJY0/ZO3WlfvZaCYpW0AiwU9M4CXNp7eqbqqSc4GBYd6zPZ8uCn+5PWnGKOarWAI4uJsx/F1x/zdeDHlJ3eyUCUhRFvMMC662WGkyVMrs4nYqcZQj175w9hArMrwRYNNWIPJ4iiNhLrOHZ1UWZ2swmwOMoTUViMFFUUrRiKFsYKuKeKTRMyzGqUpntaWZww7e5V+MZhnJNFaEqMgK9vADh5h9zTDf/oJEhky6s17F060+BP9RLLyGgwt0YQ3VFfdrMZKR5JJODi7iNX0hZtLT8G52c3zDWMUShoNGPgYvd7FN9vQL75zOxeOcK9ggbH9BIsVp2pn8BgjeCrOTi2sc4UHN/TtRlKEi5TTFI4MeqkvcoSAt4PFz8rNHakmWPHoWGOfbAhI5jtBC1ovpIZehvG5yT6QVHKI5W03EO82DLAljOT9ijd/njWWL1KUlysR4W0AKA6doxXhDU+0U2jEpwhtSU2jNuwb3sCzjrpCvXUnJpbtfny61ZftTjkg2lx8v2K9iC0hkyeJf3MdGXa98DlOoH6BfDFepX+ZuVur8jh2mGx05E/ZSnqMVCzVbNlamlj3PmKth8/hPQbdlC0jk+ZGWtGWJ3y29qXxCA54J0wYpPSTxIIl84bdE2aymB/WZH6FvXhqP0Z2fNXKXW5O9zUD2c44fefTaEkjBKpa6cwZrHTZ4NFRKZnYn52r4g4rc2DwYPKxiFRVpQwsaU53iFMVBHtlc5Fd2spYNYfF/ZQzBVrZSnPtoTiPqUIYYnAhySCOZvWxhLad0p5UhqaFVb55gPt+SSEfuJYE4nLi5wnF28D3rFGH/xzRc0sFjwUSljMa3JNVC2XdoOE3LNbEnu4hGWpmSEX15Va/eaQH8msSqeq8SHA3QFlVU129SDff60cQTjZNcMskwNEMpLTu2KN3Csx0D4SCGGFwIsrlioqMqJps0W98hFCEaBx6yC4NTbBsbGxsbGxsbGxsbGxsbG5sbHoelJqjGNWVRFNW51zD4mtp6PBtDlOIDjnKGlaoHcRunJcl+jqdWZwV/KkwBQ8MXbFTdeGYhtgReTzj5mqFUoAht+N6w7yo1Yihh+IiFUtxkuRf7a9RlMn29fxdTaE9sbPxQBzfHqUQ0b7OeREvSNH4i1nYE94asjm0RV08kc4V+P5O9Yep6wkH+fzSbUQiv3t9BJ9rjYiNzvL6oKtGXW/mTeewA+tGSyWwDhtGIMRzkDWrwMgOpzBjq0ItvWERHujGdGrTkLJO97lOr0Z/KbOMkvZjLMkVpHqMTH9KIZqQwiT+Af3MLb/AEt7CLqV4To3o8QSWO8hknuI1RZDCEHKA9j3OQMZSlD/XIYiPzcPMEfYGmzOJzVjOekgwhDbiNXlTlODM5AlThHXawnd44+Mq7F70J3SnDIT5TdSBuc0PgYBmCNKbR0jt4dvEFgiwyESwnCriHVAQeBHn0B6YjvDvNlyJoBWwnj/0IMqnEEASjgZcRHEYgEBwlDmhwNZ0zCEb4lKLgCzIawQFvnH1EARtw8xseBILpAPyDHG8q6bQimmQEHQDYjOBpqpGChzRyEMwBxnnTEzwDnCCH8sBjZHlTyaADcDuCY2TjQZBDM+BhcskjHcEp2Ym9NjcU8XzARQSCFdwEdEewinKUZC6CbrhIQvARDRnEeSbjVBUQwT4eIBEkApLOYyRyBEEHHKxD8Bl30JVUPwKSSidacRrBfcAGBLtpRm9yySCGCqSRwws0ZCwejhDFawgWAfVwc54SOOnHAGK5hZO4SaAmwxGsoiWVKRCQ0pwjj5E04E08pBDH7QgE79CQBQimkN8NDCGGFxmoOFDO5gajFP04hmAmMAfBQdaylr0IJlMTN8e8X5d8Q051AWnrTctXQKYCMAlBf4qTQ6rXOPN1PwLyLgBfIOhCvoDkr4kdxUNluiG8roscJOGhIdXJ5ApVmYDgQ8BBT7aSzA5OILgf6RwkX0AeQvAdDsDBJgSJ3I7gOEW8oRcDvXGTxWb+a9QPgL2KdT1Rhmdpz0U+pTPQiiIUA06QQgp7mE0SsThI9drayk+n8rVFPqmSer7juHzLaxcucr1zGn/n0eabu/sar+fPX3IBB3EUHAgqOIeDYpxgObE8RU88fAK0YhZ1WMwu4kFjxSo/FeFNBa9F8+/kXc0HZvEoy6nBKHZQ10iT2gJyPdGdyUwkARd3Apl42A0cpg+9WMhB5pPMeRrSAqjMPLri5DJQH6hLEwM5XWIf5XmZ4tTnGdPlTcJDJxKAJjTjCgeBKcBLVGA1h4BEXExkKM9d3ZEogAo4fd7cveTRntuABrQmW9Vv/P10YggJfEopHgaaMEC2NcDmBqAYOxFkcgY3Hp4HKnACD3vZRA5XuBcYhods9nABwTc46YIgj71cIttniFXQy/oOsUYBMAFBf+ABshBcJpfLfoZYQ4D8YVwX8odY+Y53DuOhCk7mIkhjD1kI3gIgyjux7wxARwRneJ9NeBA0BxLIxsMxHqNgiOVgOoLLJJGJYAL5k/T8c1haIVjiLcFZfiANN22I409ZmTWxvyDXExm0ZQrplOMATzMROEtLFpHAPWynHduACTzFUe4klwk8iYcljCWDW1jAHEN5raQVX7ObDxiD2dN7PfRlNGncSQrPe49IyOVTINnrIGgZI3EyiCNXTyg5xgukUpn6V1MRDOJVUqnH77yk4bfxOcbioQ1n6McqstlGul+XDjY2QdKAD6gJOFmK4OFIF8fGpnAxC0EKk1mL4GcDZ4XY2NwQxDOVywhyWUOtSBcmdNimXjbmKUVFLvF7hB3Z2djY2NjY2NjY/LX4f0HXxRCQT3IRAAAAYnRFWHRjb21tZW50AGJvcmRlciBiczowIGJjOiMwMDAwMDAgcHM6MCBwYzojZWVlZWVlIGVzOjAgZWM6IzAwMDAwMCBjazo1MDBkMDJhNGYxZjFkNzQ5NzM0MGNjNTg2ODk2YmYxMYSf0AAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMTItMjBUMTU6NTk6NTYrMDA6MDAghzoMAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTEyLTIwVDE1OjU5OjU2KzAwOjAwUdqCsAAAAABJRU5ErkJggg==";

$('a[href^="#"]').click(function() {
  var A = $(this).attr("href");
  return $("html, body").animate({ scrollTop: $(A).offset().top }, "slow"), !1;
});
for (
  var btns = document.getElementsByClassName("nav-list-item"), i = 0;
  i < btns.length;
  i++
)
  btns[i].addEventListener("click", function() {
    var A = document.getElementsByClassName("active");
    (A[0].className = A[0].className.replace(" active", "")),
      (this.className += " active");
  });



//
//function myFunction(x) {
//  if (x.matches) 
//  { // If media query matches
//    document.getElementById('modelJs').style.display='';    
//  } 
//    else 
//    {
//    document.getElementById('modelJs').style.display='table';
//    document.getElementById('change').style.display='table';
//    document.getElementById('change').style.width='100%';
//    document.getElementById('change').style.height='100%';
//    document.getElementById('change').style.position='absolute';
//    document.getElementById('change').style.top='20%';
//    document.getElementById('change').style.bottom='20%';
//    document.getElementById('change').style.left='-35%';
//    document.getElementById('change').style.right='15%';
//   
//  }
//}
//
//var x = window.matchMedia("(max-width: 768px)")
//myFunction(x) // Call listener function at run time
//x.addListener(myFunction) // Attach listener function on state changes
//
//
//


