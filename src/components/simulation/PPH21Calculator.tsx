import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import SalaryCalculator from './SalaryCalculator';

interface FormData {
  gajiPokok: string;
  tunjangan: string;
  jumlahTanggungan: string;
  statusPerkawinan: 'TK' | 'K';
}

interface HasilPerhitungan {
  penghasilanBruto: number;
  biayaJabatan: number;
  penghasilanNetto: number;
  penghasilanNettoTahunan: number;
  ptkp: number;
  pkp: number;
  pph21Tahunan: number;
  pph21Bulanan: number;
}

const PPH21Calculator: React.FC = () => {

  const [isDark] = useState(false);

  
  const [formData, setFormData] = useState<FormData>({
    gajiPokok: '',
    tunjangan: '',
    jumlahTanggungan: '0',
    statusPerkawinan: 'TK',
  });

  const [hasil, setHasil] = useState<HasilPerhitungan | null>(null);

  const hitungPTKP = (statusPerkawinan: 'TK' | 'K', jumlahTanggungan: string): number => {
    const ptkpDasar = 54000000;
    const tambahan: Record<'TK' | 'K', number> = {
      'TK': 0,
      'K': 4500000,
    };
    const ptkpPerTanggungan = 4500000;

    return ptkpDasar + 
           tambahan[statusPerkawinan] + 
           (parseInt(jumlahTanggungan) * ptkpPerTanggungan);
  };

  const hitungPPH21 = (): void => {
    const penghasilanBruto = parseInt(formData.gajiPokok) + parseInt(formData.tunjangan);
    const biayaJabatan = Math.min(penghasilanBruto * 0.05, 6000000);
    const penghasilanNetto = penghasilanBruto - biayaJabatan;
    const penghasilanNettoTahunan = penghasilanNetto * 12;
    const ptkp = hitungPTKP(formData.statusPerkawinan, formData.jumlahTanggungan);
    const pkp = Math.max(0, penghasilanNettoTahunan - ptkp);

    let pph21Tahunan = 0;

    if (pkp <= 60000000) {
      pph21Tahunan = pkp * 0.05;
    } else if (pkp <= 250000000) {
      pph21Tahunan = (60000000 * 0.05) + ((pkp - 60000000) * 0.15);
    } else if (pkp <= 500000000) {
      pph21Tahunan = (60000000 * 0.05) + (190000000 * 0.15) + ((pkp - 250000000) * 0.25);
    } else if (pkp <= 5000000000) {
      pph21Tahunan = (60000000 * 0.05) + (190000000 * 0.15) + (250000000 * 0.25) + ((pkp - 500000000) * 0.30);
    } else {
      pph21Tahunan = (60000000 * 0.05) + (190000000 * 0.15) + (250000000 * 0.25) + (4500000000 * 0.30) + ((pkp - 5000000000) * 0.35);
    }

    const pph21Bulanan = pph21Tahunan / 12;

    setHasil({
      penghasilanBruto,
      biayaJabatan,
      penghasilanNetto,
      penghasilanNettoTahunan,
      ptkp,
      pkp,
      pph21Tahunan,
      pph21Bulanan
    });
  };

  const formatRupiah = (angka: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(angka);
  };

  const handleInputChange = (name: string, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    hitungPPH21();
  };

  return (
    <div className="min-h-screen py-24 p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto relative ">
        
        <Card className="shadow-2xl "  style={{  
          boxShadow: isDark
            ? "0px 20px 50px -10px rgba(79, 70, 229, 0.4)"
            : "0px 20px 50px -10px rgba(59, 130, 246, 0.3)"
        }}>
          <CardHeader className="text-primary-foreground ">
          <h1 
          className=" text-center text-4xl md:text-5xl font-extrabold mb-3  bg-gradient-to-r from-blue-600 to-green-500 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent"
        >
           Calculator PPH 21
        </h1>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Form Section */}
              <div className="flex-1 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="gajiPokok">Gaji Pokok</Label>
                      <Input
                        id="gajiPokok"
                        type="number"
                        className='dark:ring-1'
                        value={formData.gajiPokok}
                        onChange={(e) => handleInputChange('gajiPokok', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tunjangan">Tunjangan dan Bonus</Label>
                      <Input
                        id="tunjangan"
                        type="number"
                        value={formData.tunjangan}
                        className='dark:ring-1'
                        onChange={(e) => handleInputChange('tunjangan', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="statusPerkawinan">Status Perkawinan</Label>
                      <Select
                        value={formData.statusPerkawinan}
                        
                        onValueChange={(value) => handleInputChange('statusPerkawinan', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TK">Belum Kawin (TK)</SelectItem>
                          <SelectItem value="K">Kawin (K)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jumlahTanggungan">Jumlah Tanggungan</Label>
                      <Select
                        value={formData.jumlahTanggungan}
                        onValueChange={(value) => handleInputChange('jumlahTanggungan', value)}
                        
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jumlah" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Hitung PPH 21
                  </Button>
                </form>
              </div>

              {/* Results Section */}
              {hasil && (
                <div className="flex-1" style={{  
                  boxShadow: isDark
                    ? "0px 20px 50px -10px rgba(79, 70, 229, 0.4)"
                    : "0px 20px 50px -10px rgba(59, 130, 246, 0.3)"
                }}>
                  <div className="rounded-lg border bg-card shadow-md text-card-foreground s">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-6">Hasil Perhitungan:</h3>
                      <div className="grid gap-4">
                        <div className="p-4 rounded-lg bg-muted">
                          <p className="text-sm text-muted-foreground">Penghasilan Bruto</p>
                          <p className="text-lg font-semibold">{formatRupiah(hasil.penghasilanBruto)}</p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-muted">
                          <p className="text-sm text-muted-foreground">Penghasilan Netto Tahunan</p>
                          <p className="text-lg font-semibold">{formatRupiah(hasil.penghasilanNettoTahunan)}</p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-muted">
                          <p className="text-sm text-muted-foreground">PTKP</p>
                          <p className="text-lg font-semibold">{formatRupiah(hasil.ptkp)}</p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-muted">
                          <p className="text-sm text-muted-foreground">PKP</p>
                          <p className="text-lg font-semibold">{formatRupiah(hasil.pkp)}</p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-primary text-primary-foreground">
                          <p className="text-sm">PPH 21 Perbulan</p>
                          <p className="text-2xl font-bold">{formatRupiah(hasil.pph21Bulanan)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    <SalaryCalculator/>
    </div>
  );
};

export default PPH21Calculator;