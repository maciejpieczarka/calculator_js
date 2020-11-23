//Maciej Pieczarka

function formatNumber(number) //Sprawia, ze liczba jest rozdzielana przecinkami
{
    if(number == "-")
    {
        return "-";
    }

    var num = Number(number);
    var value = num.toLocaleString("en");

    return value;
}

function getHistory()//Zwraca historie dzialania
{
    return document.getElementById("history-value").innerText;
}

function displayHistory(number)//Wyswietla historie dzialan
{
    document.getElementById("history-value").innerText = number;
}

function getOutput() //Zwraca dzialanie, ktore jest podane przez uzytkownika
{
    return document.getElementById("output-value").innerText;
}

function displayOutput(number) //Wyswietla nacisniete cyfry i operatory
{
    if(number == "")
    {
        document.getElementById("output-value").innerText = number;
    }
    else
    {
        document.getElementById("output-value").innerText = formatNumber(number);
    }
}

function deleteNumberFormat(number)//Funkcja usuwajaca przecinki
{
    return Number(number.replace(/,/g,'')); 
}

//Operatory i dzialania

//operatory
var operator = document.getElementsByClassName("operator");//przypisanie operatora do zmiennej "operator"

for(var i = 0; i < operator.length; i++)//Petla wykonujaca sie tyle razy ile jest elementow z klasą "operator"
{
    operator[i].addEventListener('click', function()//Nadawanie kazdemu operatorowi w kalkulatorze funkcji "click"
    {
        if(this.id == "clear")//Jesli kliknieto clear ("C")
        {
            displayHistory("");
            displayOutput("0");
        }
        else if(this.id == "backspace")//Jesli kliknieto backspace ("CE")
        {
            var output = deleteNumberFormat(getOutput()).toString();//Przypisanie do zmiennej "output" wyswietlanej liczby bez przecinków
            if(output)//Jesli liczba jest podana
            {
                output = output.substr(0,output.length-1);//Usuniecie ostatniego znaku w ciagu liczbowym (backspace)
                if(output == "")
                {
                    output = "0";
                }
                displayOutput(output);//Wyswietlenie liczby po usunieciu ostatniego znaku
            }
        }
        else
        {
            var output = getOutput();
            var history = getHistory();

            if(output == "" && history != "")//Jesli historia nie jest pusta, ale wyswietlona liczba tak:
            {
                if(isNaN(history[history.length-1]))//Sprawdz czy ostatni znak w historii to nie liczba
                {
                    history = history.substr(0, history.length-1);//Usun ostatni znak
                }
            }

            if(output != "" || history != "")//Jesli liczba jest podana, lub jest w historii
            {
                output = output==""? output : deleteNumberFormat(output);//Usun przecinki
                history = history + output;//Przypisz wartosc wyswietlana do historii
                if(this.id == "=")//Jesli nacisnieto znak "="
                {
                    var result = eval(history);//Zmienna "result" przechowuja wynik dzialania w historii
                    displayOutput(result);//Wyswietla wynik
                    displayHistory("");//Usuwa historie
                }
                else
                {
                    history = history + this.id;//Dodaj do historii podany operator
                    displayHistory(history);
                    displayOutput("");//Usun wyswietlana liczbe
                }
            }
        }
    });
}


//cyfry
var number = document.getElementsByClassName("number");//przypisanie cyfry do zmiennej "number"

for(var i = 0; i < number.length; i++)//Petla wykonujaca sie tyle razy ile jest elementow z klasą "number"
{
    number[i].addEventListener('click', function()//Nadawanie kazdemu numerowi w kalkulatorze funkcji "click"
    {
        var output = deleteNumberFormat(getOutput());
        if(output != NaN) //Jesli podana zostala cyfra i miejsce nie jest puste - kontynuuj
        {
            output = output+this.id;
            displayOutput(output);
        }
    });
}