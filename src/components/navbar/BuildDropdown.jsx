import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Upload, Trash2, Bookmark } from 'lucide-react';
import { IconButton } from '../ui/IconButton';

export const BuildDropdown = ({ builds, onLoad, onDelete }) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as={IconButton} icon={Upload} tooltip="Load Saved Build" />
      <Transition
        enter="transition duration-200 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-in"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-100 py-3 focus:outline-none divide-y divide-gray-50">
          <div className="px-4 py-2 mb-2">
            <h3 className="text-sm font-medium text-gray-900">Saved Builds</h3>
            <p className="text-xs text-gray-500">Load or manage your saved configurations</p>
          </div>
          <BuildsList builds={builds} onLoad={onLoad} onDelete={onDelete} />
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const BuildsList = ({ builds, onLoad, onDelete }) => {
  if (builds.length === 0) {
    return (
      <div className="px-4 py-6 text-center">
        <Bookmark className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm font-medium text-gray-900">No saved builds</p>
        <p className="mt-1 text-xs text-gray-500">Save your first build to see it here</p>
      </div>
    );
  }

  return (
    <div className="max-h-[60vh] overflow-y-auto">
      {builds.map((build, index) => (
        <BuildItem key={index} build={build} onLoad={onLoad} onDelete={onDelete} />
      ))}
    </div>
  );
};

const BuildItem = ({ build, onLoad, onDelete }) => (
  <Menu.Item>
    {({ active }) => (
      <div className={`px-4 py-3 ${active ? 'bg-gray-50' : ''}`}>
        <div className="flex items-center justify-between group">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">{build.title}</h3>
            <p className="text-xs text-gray-500">
              {new Date(build.timestamp).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className="ml-4 flex items-center gap-2">
            <button
              onClick={() => onLoad(build)}
              className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
            >
              <Upload className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(build.timestamp)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    )}
  </Menu.Item>
); 