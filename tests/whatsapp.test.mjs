import { test } from 'node:test';
import assert from 'node:assert/strict';
import { linkWhatsApp } from '../src/lib/whatsapp.ts';

test('codifica acentos e mantém só dígitos do número', () => {
  assert.equal(linkWhatsApp('Olá! Quero saber', '(11) 99999-0000'), 'https://wa.me/11999990000?text=Ol%C3%A1!%20Quero%20saber');
});

test('número pendente gera link válido sem destinatário', () => {
  assert.equal(linkWhatsApp('Oi', null), 'https://wa.me/?text=Oi');
});
