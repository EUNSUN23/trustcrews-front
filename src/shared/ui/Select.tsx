import { Fragment } from 'react';
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { AiFillCaretDown } from '@react-icons/all-files/ai/AiFillCaretDown';
import { selectItemComparator } from '@/shared/utils/selectItemComparator';
import { clsx } from 'clsx';
import { SelectItem } from '@/shared/types/selectItem';

export type SelectProps<T, V> = {
  items: readonly SelectItem<T, V>[];
  value: SelectItem<T, V>;
  setValue: (item: SelectItem<T, V>) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
};

const Select = <T, V>({
  value,
  setValue,
  items = [],
  label,
  placeholder = '',
  required = false,
}: SelectProps<T, V>) => {
  return (
    <Listbox value={value} onChange={setValue} by={selectItemComparator}>
      {({ open }) => (
        <div>
          {label && (
            <Label className='block text-gray-700 mobile:text-sm'>
              {label}
              {required ? (
                <span className='text-red-500 required-dot ml-1.5 align-middle'>
                  *
                </span>
              ) : (
                <></>
              )}
            </Label>
          )}
          <div className='relative'>
            <ListboxButton className='w-full mobile:text-sm cursor-default rounded-lg border-1 flex-1 appearance-none border py-2 pl-4 pr-10 text-left bg-white border-gray-300 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'>
              <span
                className={clsx('block truncate', value && 'text-greyUnselect')}
              >
                {value ? (value.name as string) : placeholder}
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <AiFillCaretDown
                  className='w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </ListboxButton>
            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <ListboxOptions className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {items.map((item) => (
                  <ListboxOption
                    key={item.value as string}
                    className={({ focus }) =>
                      clsx(
                        'relative cursor-default select-none py-2 pl-3 pr-9 mobile:text-sm',
                        focus
                          ? 'bg-primary opacity-50 text-white'
                          : 'text-gray-900',
                      )
                    }
                    value={item}
                  >
                    {({ selected, focus }) => (
                      <>
                        <span
                          className={clsx(
                            'block truncate',
                            selected ? 'font-bold' : 'font-normal',
                          )}
                        >
                          {item.name as string}
                        </span>
                        {selected ? (
                          <span
                            className={clsx(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              focus ? 'text-white' : 'text-primary',
                            )}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default Select;
