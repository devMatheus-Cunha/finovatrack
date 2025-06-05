// API Route para scraping de preços

import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

interface ScrapeResponse {
  price?: number
  storeName?: string
  message: string
  error?: boolean
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<ScrapeResponse>> {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  // Valida se a URL foi fornecida
  if (!url || typeof url !== 'string') {
    return NextResponse.json(
      { message: 'URL não fornecida ou inválida', error: true },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(
        `Falha ao buscar a página (${response.status} ${response.statusText})`
      )
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    let priceText = ''
    let storeName = ''

    // Seletores comuns para preços
    priceText =
      $('[itemprop="price"]').attr('content') ||
      $('[itemprop="price"]').text() ||
      $('.price-display').text() ||
      $('#product-price').text() ||
      $('.value.price').text() ||
      $('.price').first().text()

    // Seletores comuns para nome da loja
    storeName =
      $('[itemprop="name"]').first().text() ||
      $('meta[property="og:site_name"]').attr('content') ||
      $('meta[name="application-name"]').attr('content') ||
      $('meta[name="author"]').attr('content') ||
      $('title').text()

    const cleanPrice = priceText.replace(/[^\d.,]/g, '').replace(',', '.')
    const price = parseFloat(cleanPrice)

    if (isNaN(price) || price <= 0) {
      throw new Error('Não foi possível extrair um preço válido da página')
    }

    // Limpa o nome da loja
    if (storeName) {
      storeName = storeName.trim()
      // Se for muito grande, pega só a primeira palavra
      if (storeName.length > 40) {
        storeName = storeName.split(' ')[0]
      }
    }

    return NextResponse.json({
      price,
      storeName,
      message: 'Valor buscado com sucesso!'
    })
  } catch (err: any) {
    console.error(`Erro no scraping para ${url}:`, err.message)
    return NextResponse.json(
      { message: `Erro ao buscar preço: ${err.message}`, error: true },
      { status: 500 }
    )
  }
}
