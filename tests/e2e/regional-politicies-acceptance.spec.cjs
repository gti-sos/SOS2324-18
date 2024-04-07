// @ts-check
const { test, expect } = require('@playwright/test');



/*
test('delete a country',async({page})=>{
    await page.goto('http://localhost:10000/regional-politicies-acceptance');
    
    await page.click();

});
*/


test('list all the countries with pagination',async({page})=>{
    await page.goto('http://localhost:10000/regional-politicies-acceptance');
    
    await page.locator('#loadAllCountries').click();
    await page.waitForTimeout(1000);
    let countriesCount =(await page.locator('.countryItem').all()).length; 
    await page.waitForTimeout(1000);
    expect(countriesCount).toBeGreaterThan(9);
    
});


test('create a new country',async({page})=>{
    await page.goto('http://localhost:10000/regional-politicies-acceptance');
    
    await page.waitForTimeout(1000);
    await page.locator('#name').fill('example');
    await page.locator('#yes').fill('100');
    await page.locator('#no').fill('100');
    await page.locator('#n_a').fill('100');
    await page.locator('#year').fill('2004');
    await page.locator('#createCountry').click();
    await page.waitForTimeout(5000);
    let text=page.getByText("Pais creado con exito");
    expect(text).toContainText("Pais creado con exito");
    
});


test('edit a country',async({page})=>{
    
    await page.waitForTimeout(6000);
    await page.goto('http://localhost:10000/regional-politicies-acceptance/eu/2019');
    
    await page.locator('#yes').fill('100');
    await page.locator('#no').fill('100');
    await page.locator('#n_a').fill('100');

    await page.locator('#send').click();
    await page.getByRole('alert',{name:"Pais editado con exito"}).isVisible();    

});


test('search by years',async({page})=>{
    
    await page.waitForTimeout(6000);
    await page.goto('http://localhost:10000/regional-politicies-acceptance');
    
    await page.locator('#accordion1').click();
    await page.locator('#accordion1-1').click();

    await page.locator('#initialYear').fill('2020');
    await page.locator('#lastYear').fill('2020');

    await page.locator('#searchYears').click();
    
    await page.getByRole('alert',{name:"No se ha encontrado ningún pais que cumpla con el intervalo de años dado"}).isVisible();    

});




test('search by entries',async({page})=>{
    
    await page.waitForTimeout(8000);
    await page.goto('http://localhost:10000/regional-politicies-acceptance');
    
    await page.locator('#accordion1').click();
    await page.locator('#accordion2').click();
    await page.locator('#nameInput').fill('bosnia');

    await page.locator('#searchWithFields').click();
    
    await page.getByRole('alert',{name:"No se ha encontrado ningun pais que cumpla con los filtros"}).isVisible();    

});



test('delete a country',async({page})=>{
    
    await page.waitForTimeout(12000);
    await page.goto('http://localhost:10000/regional-politicies-acceptance');
    
    await page.locator('.countryItem').filter({hasText:'germany'}).getByRole('button',{name:'Borrar'}).click();

    await page.getByRole('alert',{name:"Pais borrado con exito"}).isVisible();    

});


test('delete all countries',async({page})=>{
    
    await page.waitForTimeout(15000);
    await page.goto('http://localhost:10000/regional-politicies-acceptance');
    
    await page.locator('#deleteAllCountries').click();

    await page.getByRole('alert',{name:"Pais borrado con exito"}).isVisible();    

});



