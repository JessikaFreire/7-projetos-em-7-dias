document.querySelector('.busca').addEventListener('submit', async (event) =>
{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== '')
    {
        clearInfo();
        showWarning("Carregando...");

        let url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=3f7b7b03ecd42dd2b9a70cc2f34101d0&units=metric&langpt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if (json.cod = 200) 
        {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAgle: json.wind.deg
            })
        }

        else 
        {
            clearInfo();
            showWarning('Localização não encontrada!');
        }

    }

    else
    {
        clearInfo();
    }
});

function showInfo(json) 
{
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}`, `${json.country}`;
    
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}.png`);
    
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAgle-90}deg)`;

    
    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() 
{
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) 
{
    document.querySelector('.aviso').innerHTML = msg;
}