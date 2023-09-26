import fs from 'fs';
import puppeteer from 'puppeteer';
import handlers from 'handlebars/dist/handlebars';
import { NextResponse } from "next/server";

export const POST =  async (request, res) => {

  const { name,email,total } = await request.json();
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const customerName = capitalizeFirstLetter(name); 
  const customerEmail = email 
  const totalAmount = total 
  try {
    
    const file = fs.readFileSync('./invoice-template.html', 'utf8');
    const template = handlers.compile(`${file}`);
    const html = template({ customerName,customerEmail,totalAmount });

    
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();

    
    await page.setContent(html, { waitUntil: 'networkidle0' });

    
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    
    // res.statusCode = 200;
    // res.send(pdf);
    return new NextResponse(pdf, { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
