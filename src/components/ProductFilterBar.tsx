import { setPriceRange, toggleInStock } from '@/redux/features/product/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';

export default function ProductFilterBar() {
  const { inStock, priceRange } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const handleSlider = (value: number[]) => {
    // console.log(value);
    dispatch(setPriceRange(value[0]));
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-gray-500 lg:hidden">
            <Filter size={20} className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'}>
          <SheetHeader>
            <SheetTitle>Filter products</SheetTitle>
            <SheetDescription>Find your desired product</SheetDescription>
          </SheetHeader>
          <div className="mt-10 space-y-8">
            <div>
              <div className="flex items-center space-x-3" onClick={() => dispatch(toggleInStock())}>
                <Switch id="availability" checked={inStock} />
                <Label htmlFor="availability">Availability: {inStock ? 'In stock' : 'All products'}</Label>
              </div>
            </div>
            <div className="w-[80%] space-y-3 ">
              <div className="flex items-center justify-between">
                <p>Price range:</p>
                <span className="text-sm text-gray-500 font-medium">${priceRange}</span>
              </div>
              <Slider defaultValue={[priceRange]} min={0} max={20000} step={1} onValueChange={handleSlider} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="hidden w-[18vw] h-[80vh] p-5 border rounded-xl lg:block">
        <div>
          <h2 className="text-xl font-bold">Filter products</h2>
          <p className="text-gray-500 text-sm">Find your desired product</p>
        </div>
        <div className="mt-5 space-y-8">
          <div>
            <div className="flex items-center space-x-3" onClick={() => dispatch(toggleInStock())}>
              <Switch id="availability" checked={inStock} />
              <Label htmlFor="availability">Availability: {inStock ? 'In stock' : 'All products'}</Label>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p>Price range:</p>
              <span className="text-sm text-gray-500 font-medium">${priceRange}</span>
            </div>
            <Slider defaultValue={[priceRange]} min={0} max={20000} step={1} onValueChange={handleSlider} />
          </div>
        </div>
      </div>
    </div>
  );
}
