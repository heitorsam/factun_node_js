const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async emissaoCobrancaQrCodePix(req, res) {
    const url = 'https://api.cora.com.br/invoices/';
    // const url = 'https://api.stage.cora.com.br/invoices/';
    const idempotencyKey = uuidv4(); // Gera um UUID aleatório

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Idempotency-Key': idempotencyKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        code: 'tgmapp01',
        customer: {
          name: 'Heitor Scalabrini Sampaio',
          'e-mail': 'scalabrinih@gmail.com',
          document: { identity: '33730226819', type: 'CPF' },
          address: {
            street: 'Rua Aracuai',
            number: '208',
            district: 'Bosque dos Eucaliptos',
            city: 'São José dos Campos',
            state: 'SP',
            complement: 'AP 31',
            zip_code: '12233380'
          }
        },
        payment_terms: {
          due_date: '2024-01-12',
          fine: { amount: 100 },
          discount: { type: 'PERCENT', value: 0 }
        },
        payment_forms: ['PIX'],
        services: {
          name: 'servico', 
          description: 'Aluguel de imóvel', 
          amount: 100
        },
      })
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const json = await response.json();
      console.log('Resposta da API externa (Pix):', json);
      res.json({ status: 'success', mensagem: 'Integração com a API externa (Pix) realizada com sucesso!' });
    } catch (error) {
      console.error('Erro ao integrar com a API externa (Pix):', error.message);
      console.error('uuid:', idempotencyKey);
      

      if (error.type === 'invalid-json') {
        console.error('Corpo da resposta inválido:', await response.text());
      }

      res.status(500).json({ status: 'error', mensagem: 'Erro ao integrar com a API externa (Pix).' });
    }
  }
};
