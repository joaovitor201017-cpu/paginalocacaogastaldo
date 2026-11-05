import { test } from 'node:test';
import assert from 'node:assert/strict';
import { linkWhatsApp, numeroWhatsApp } from '../src/lib/whatsapp.ts';

test('codifica acentos e usa o número internacional (55 + DDD)', () => {
  assert.equal(linkWhatsApp('Olá! Quero saber', '(11) 99322-6252'), 'https://wa.me/5511993226252?text=Ol%C3%A1!%20Quero%20saber');
});

test('número que já tem 55 não ganha 55 de novo', () => {
  assert.equal(numeroWhatsApp('+55 (11) 99322-6252'), '5511993226252');
});

test('número pendente gera link válido sem destinatário', () => {
  assert.equal(linkWhatsApp('Oi', null), 'https://wa.me/?text=Oi');
  assert.equal(numeroWhatsApp(null), '');
});
