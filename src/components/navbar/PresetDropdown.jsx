import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bookmark, Upload } from 'lucide-react';
import { IconButton } from '../ui/IconButton';

export const PresetDropdown = ({ presets, onLoad }) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as={IconButton} icon={Bookmark} tooltip="Load Preset" />
      <Transition
        enter="transition duration-200 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-in"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-100 py-3 focus:outline-none">
          <div className="px-4 py-2 mb-2">
            <h3 className="text-sm font-medium text-gray-900">Preset Configurations</h3>
            <p className="text-xs text-gray-500">Quick start with predefined layouts</p>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {presets.map((preset, index) => (
              <PresetItem key={index} preset={preset} onLoad={onLoad} />
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const PresetItem = ({ preset, onLoad }) => (
  <Menu.Item>
    {({ active }) => (
      <div
        className={`px-4 py-3 ${active ? 'bg-gray-50' : ''} cursor-pointer`}
        onClick={() => onLoad(preset)}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900">{preset.title}</h3>
            <p className="text-xs text-gray-500">{preset.description}</p>
          </div>
          <div className={`ml-4 ${active ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
            <Upload className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      </div>
    )}
  </Menu.Item>
); 