import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { 
  Printer, 
  Copy, 
  Check, 
  Code2, 
  Terminal, 
  FileText, 
  ExternalLink,
  Zap
} from 'lucide-react';

export const EscPosReceiptModal: React.FC = () => {
  const {
    settings,
    receiptModalOrder,
    setReceiptModalOrder,
    printEscPosReceipt,
    getPaymentStatus,
    getAmountPaid,
    getUnpaidBalance,
  } = useRestaurant();

  const [paperWidth, setPaperWidth] = useState<'58mm' | '80mm'>('80mm');
  const [copiedText, setCopiedText] = useState(false);
  const [copiedHex, setCopiedHex] = useState(false);

  if (!receiptModalOrder) return null;

  const order = receiptModalOrder;
  const printJob = printEscPosReceipt(order, paperWidth);

  const handleCopyText = () => {
    navigator.clipboard.writeText(printJob.raw_text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyHex = () => {
    navigator.clipboard.writeText(printJob.hex_bytes);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  return (
    <Dialog open={!!receiptModalOrder} onOpenChange={open => !open && setReceiptModalOrder(null)}>
      <DialogContent className="max-w-2xl bg-stone-900 border-stone-800 text-stone-100 p-0 rounded-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-black text-stone-100 flex items-center gap-2">
                <span>ESC/POS Network Thermal Receipt Bridge</span>
                <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-400 font-mono">
                  TCP:9100 / Raw USB
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-xs text-stone-400">
                Order #{order.order_number} • Token: <strong className="text-amber-400 font-mono">{order.tracking_token}</strong>
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          
          {/* Controls: Width Selector & Protocol Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-bold">Paper Format:</span>
              <div className="flex items-center gap-1 bg-stone-900 p-0.5 rounded-lg border border-stone-800">
                <button
                  type="button"
                  onClick={() => setPaperWidth('80mm')}
                  className={`px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                    paperWidth === '80mm' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-100'
                  }`}
                >
                  80mm (42 Cols)
                </button>
                <button
                  type="button"
                  onClick={() => setPaperWidth('58mm')}
                  className={`px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                    paperWidth === '58mm' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-100'
                  }`}
                >
                  58mm (32 Cols)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="success" className="text-[10px] gap-1">
                <Zap className="w-3 h-3" />
                Bridge Connected (Port 9100)
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid grid-cols-2 bg-stone-950 border border-stone-800 p-1 rounded-xl">
              <TabsTrigger value="preview" className="text-xs font-bold gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Rendered Thermal Paper</span>
              </TabsTrigger>
              <TabsTrigger value="raw_bytes" className="text-xs font-bold gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>ESC/POS Command Stream & Hex</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Rendered Thermal Tape */}
            <TabsContent value="preview" className="mt-4">
              <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 flex justify-center">
                
                {/* Simulated Thermal Paper Roll */}
                <div 
                  className={`bg-[#fffff8] text-stone-900 font-mono text-[11px] leading-tight p-5 shadow-2xl rounded-sm border-t-8 border-b-8 border-stone-200 ${
                    paperWidth === '58mm' ? 'w-64 max-w-full' : 'w-80 max-w-full'
                  }`}
                  style={{ fontFamily: '"Courier New", Courier, monospace' }}
                >
                  <div className="text-center font-bold pb-2 border-b border-dashed border-stone-400">
                    <p className="text-xs font-black tracking-wider uppercase">{settings.name}</p>
                    <p className="text-[10px] text-stone-600">{settings.address}</p>
                    <p className="text-[10px] text-stone-600">{settings.phone}</p>
                  </div>

                  <div className="py-2 border-b border-dashed border-stone-400 space-y-0.5 text-[10px]">
                    <div className="flex justify-between">
                      <span>ORDER: #{order.order_number}</span>
                      <span>{order.type.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>DATE: {new Date(order.created_at).toLocaleDateString()}</span>
                      <span>{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    {order.table_number && <div>TABLE: <strong>{order.table_number}</strong></div>}
                    <div>GUEST: {order.customer_name}</div>
                    <div className="font-bold text-stone-900">TOKEN: {order.tracking_token}</div>
                  </div>

                  {/* Items */}
                  <div className="py-2 border-b border-dashed border-stone-400 space-y-1.5">
                    {order.items.map(item => (
                      <div key={item.id} className="space-y-0.5">
                        <div className="flex justify-between font-bold">
                          <span>{item.quantity}x {item.name}</span>
                          <span>${item.total_price.toFixed(2)}</span>
                        </div>
                        {item.selected_modifiers.map((m, i) => (
                          <div key={i} className="text-[9px] text-stone-600 pl-2">
                            + {m.group_name}: {m.option_name} {m.extra_price > 0 && `(+$${m.extra_price.toFixed(2)})`}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Financials */}
                  <div className="py-2 border-b border-dashed border-stone-400 space-y-0.5 text-[10px]">
                    <div className="flex justify-between">
                      <span>SUBTOTAL</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TAX ({(settings.tax_rate * 100).toFixed(2)}%)</span>
                      <span>${order.tax_total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-black text-xs pt-1 border-t border-stone-300">
                      <span>TOTAL</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Cash Payments */}
                  <div className="py-2 border-b border-dashed border-stone-400 space-y-1 text-[10px]">
                    <div className="font-bold uppercase text-[9px] text-stone-700">CASH TENDER RECORD</div>
                    {order.payments.length === 0 ? (
                      <div className="text-stone-500 italic">*** UNPAID AT COUNTER ***</div>
                    ) : (
                      order.payments.map((p, idx) => (
                        <div key={p.id} className="space-y-0.5">
                          <div className="flex justify-between font-semibold">
                            <span>PAID CASH #{idx + 1}</span>
                            <span>${p.amount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-[9px] text-stone-600">
                            <span>Tendered: ${p.tendered.toFixed(2)}</span>
                            <span>Change: ${p.change_returned.toFixed(2)}</span>
                          </div>
                        </div>
                      ))
                    )}
                    <div className="flex justify-between font-bold pt-1">
                      <span>BALANCE DUE:</span>
                      <span>${getUnpaidBalance(order).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-center pt-3 space-y-1 text-[9px] text-stone-600">
                    <p className="font-bold uppercase">{settings.receipt_footer}</p>
                    <p className="tracking-widest">*** ESC/POS NETWORK TICKET ***</p>
                  </div>

                </div>

              </div>
            </TabsContent>

            {/* Tab 2: ESC/POS Command Byte Stream */}
            <TabsContent value="raw_bytes" className="mt-4 space-y-3">
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 font-mono text-xs text-stone-300 space-y-2">
                <div className="flex items-center justify-between text-stone-400 text-[11px] pb-1 border-b border-stone-800">
                  <span>ESC/POS Command Protocol Sequence:</span>
                  <button onClick={handleCopyHex} className="flex items-center gap-1 text-amber-400 hover:underline">
                    {copiedHex ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedHex ? 'Copied Hex' : 'Copy Hex'}</span>
                  </button>
                </div>
                <div className="bg-stone-900 p-3 rounded-lg text-emerald-400 font-mono text-[11px] overflow-x-auto">
                  <code>{printJob.hex_bytes}</code>
                </div>
                <div className="text-[11px] text-stone-400 space-y-1">
                  <p>• <code>\x1B\x40</code> : Initialize Printer (ESC @)</p>
                  <p>• <code>\x1B\x61\x01</code> : Center align text header</p>
                  <p>• <code>\x1D\x56\x42\x00</code> : GS V - Full Auto-Cut with feed</p>
                  <p>• <code>\x1B\x70\x00\x19\xFA</code> : ESC p - Pulse Drawer Kick (Pin 2, 50ms)</p>
                </div>
              </div>
            </TabsContent>

          </Tabs>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyText}
            className="border-stone-800 text-stone-300 hover:text-stone-100 text-xs gap-1.5"
          >
            {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedText ? 'Copied ASCII Text' : 'Copy Receipt Text'}</span>
          </Button>

          <Button
            onClick={() => {
              window.print();
            }}
            className="h-10 px-5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl gap-2 shadow-lg shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>Send to ESC/POS Thermal Printer</span>
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default EscPosReceiptModal;
